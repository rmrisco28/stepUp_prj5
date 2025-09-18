package com.example.backend.extracurricular.service;

import com.example.backend.extracurricular.dto.ETCAddForm;
import com.example.backend.extracurricular.dto.ETCDetailDto;
import com.example.backend.extracurricular.dto.ETCEditForm;
import com.example.backend.extracurricular.dto.ETCListDto;
import com.example.backend.extracurricular.entity.*;
import com.example.backend.extracurricular.enums.OperationType;
import com.example.backend.extracurricular.repository.ExtraCurricularImageContentRepository;
import com.example.backend.extracurricular.repository.ExtraCurricularImageThumbRepository;
import com.example.backend.extracurricular.repository.ExtraCurricularProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class ExtraCurricularService {

    private final ExtraCurricularProgramRepository extraCurricularProgramRepository;
    private final ExtraCurricularImageThumbRepository extraCurricularImageThumbRepository;
    private final ExtraCurricularImageContentRepository extraCurricularImageContentRepository;
    private final S3Client s3Client;

    @Value("${image.prefix}")
    private String imagePrefix;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    // S3에 파일 업로드
    private void uploadFile(MultipartFile file, String objectKey) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(objectKey)
                    .acl(ObjectCannedACL.PUBLIC_READ) // 공개 읽기 권한
                    .build();

            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        } catch (Exception e) {
            throw new RuntimeException("파일 업로드 실패: " + objectKey, e);
        }
    }

    // S3에서 파일 삭제
    private void deleteFile(String objectKey) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest
                .builder()
                .bucket(bucketName)
                .key(objectKey)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    // 썸네일 이미지 파일 저장 (DB 저장 + S3 업로드)
    private void saveThumbImages(ExtraCurricularProgram ETC, ETCAddForm dto) {
        MultipartFile file = dto.getThumbnail();
        if (file != null && !file.isEmpty()) {
            // DB에 파일 메타정보 저장
            ExtraCurricularImageThumb ETCThumb = new ExtraCurricularImageThumb();
            ExtraCurricularImageThumbId id = new ExtraCurricularImageThumbId();
            id.setProgramSeq(ETC.getSeq());
            id.setName(file.getOriginalFilename());
            ETCThumb.setProgram(ETC);
            ETCThumb.setId(id);
            extraCurricularImageThumbRepository.save(ETCThumb);

            // S3에 파일 업로드
            String objectKey = "prj5/ETC_Thumb/" + ETC.getSeq() + "/" + file.getOriginalFilename();
            uploadFile(file, objectKey);
        }
    }

    // 본문 이미지 파일 저장 (DB 저장 + S3 업로드)
    private void saveContextImages(ExtraCurricularProgram ETC, ETCAddForm dto) {
        List<MultipartFile> files = dto.getContentImages();
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                if (file != null && file.getSize() > 0) {
                    // DB에 파일 메타정보 저장
                    ExtraCurricularImageContent ETCContent = new ExtraCurricularImageContent();
                    ExtraCurricularImageContentId id = new ExtraCurricularImageContentId();
                    id.setProgramSeq(ETC.getSeq());
                    id.setName(file.getOriginalFilename());
                    ETCContent.setProgram(ETC);
                    ETCContent.setId(id);
                    extraCurricularImageContentRepository.save(ETCContent);

                    // S3에 파일 업로드
                    String objectKey = "prj5/ETC_Content/" + ETC.getSeq() + "/" + file.getOriginalFilename();
                    uploadFile(file, objectKey);
                }
            }
        }
    }

    // 비교과 프로그램 등록(관리목록에 등록)
    public void register(ETCAddForm etcAddForm) {

        ExtraCurricularProgram ETCProgram = new ExtraCurricularProgram();
        ETCProgram.setTitle(etcAddForm.getTitle());
        ETCProgram.setContent(etcAddForm.getContent());
        ETCProgram.setOperateStartDt(etcAddForm.getOperateStartDt());
        ETCProgram.setOperateEndDt(etcAddForm.getOperateEndDt());
        ETCProgram.setApplyStartDt(etcAddForm.getApplyStartDt());
        ETCProgram.setApplyEndDt(etcAddForm.getApplyEndDt());
        ETCProgram.setCompetency(etcAddForm.getCompetency());
        ETCProgram.setLocation(etcAddForm.getLocation());

        ETCProgram.setOperationType(mapToEnum(etcAddForm.getOperationType()));

        ETCProgram.setGrades(etcAddForm.getGrades());
        ETCProgram.setCapacity(etcAddForm.getCapacity());
        ETCProgram.setManager(etcAddForm.getManager());
        ETCProgram.setManagerPhone(etcAddForm.getManagerPhone());
        ETCProgram.setMileagePoints(etcAddForm.getMileagePoints());
        ETCProgram.setAuthor(etcAddForm.getAuthor());

        // 1. 프로그램 저장
        extraCurricularProgramRepository.save(ETCProgram);

        // 2. 썸네일 저장 (단일 파일)
        saveThumbImages(ETCProgram, etcAddForm);
//        if (etcAddForm.getThumbnail() != null && !etcAddForm.getThumbnail().isEmpty()) {
//            saveSingleImage(ETCProgram, etcAddForm.getThumbnail(), "thumbnail");
//        }

        // 3. 본문 이미지 저장 (다중 파일)
        saveContextImages(ETCProgram, etcAddForm);
//        if (etcAddForm.getContentImages() != null && !etcAddForm.getContentImages().isEmpty()) {
//            saveImages(ETCProgram, etcAddForm.getContentImages(), "contentImages");
//        }

    }

    // 한글 -> Enum 매핑
    private OperationType mapToEnum(String value) {
        return switch (value) {
            case "대면" -> OperationType.OFFLINE;
            case "비대면" -> OperationType.ONLINE;
            case "혼합" -> OperationType.HYBRID;
            default -> throw new IllegalArgumentException("알 수 없는 운영방식: " + value);
        };
    }


    // 단일 파일 저장용 (기존 saveImages 재사용)
//    private void saveSingleImage(ExtraCurricularProgram program, MultipartFile image, String target) {
//        saveImages(program, List.of(image), target);
//    }
//
//    // 다중 파일 저장
//    private void saveImages(ExtraCurricularProgram program, List<MultipartFile> images, String target) {
//        if (images == null || images.isEmpty()) return;
//
//        for (MultipartFile image : images) {
//            if (image == null || image.isEmpty()) continue;
//
//            // 1) DB 저장
//            if ("thumbnail".equals(target)) {
//                ExtraCurricularImageThumb thumb = new ExtraCurricularImageThumb();
//                ExtraCurricularImageThumbId id = new ExtraCurricularImageThumbId();
//                id.setProgramSeq(program.getSeq());
//                id.setName(image.getOriginalFilename());
//                thumb.setProgram(program);
//                thumb.setId(id);
//                extraCurricularImageThumbRepository.save(thumb);
//
//            } else if ("contentImages".equals(target)) {
//                ExtraCurricularImageContent content = new ExtraCurricularImageContent();
//                ExtraCurricularImageContentId id = new ExtraCurricularImageContentId();
//                id.setProgramSeq(program.getSeq());
//                id.setName(image.getOriginalFilename());
//                content.setProgram(program);
//                content.setId(id);
//                extraCurricularImageContentRepository.save(content);
//            }
//
//            // 2) 로컬 디렉토리 저장
//            String basePath = "C:/Users/admin/IdeaProjects/stepUp_prj5/frontend/public/ETCProgramImages/";
//            basePath += "thumbnail".equals(target) ? "thumb/" : "content/";
//
//            File dir = new File(basePath + program.getSeq());
//            if (!dir.exists()) dir.mkdirs();
//
//            try {
//                File dest = new File(dir, image.getOriginalFilename());
//                image.transferTo(dest);
//            } catch (IOException e) {
//                e.printStackTrace();
//                throw new RuntimeException("이미지 저장 실패: " + image.getOriginalFilename());
//            }
//        }
//    }


//    // 이미지 저장
//    private void saveImages(ExtraCurricularProgram ETCProgram, List<MultipartFile> images, String target) {
//        if (images != null && images.size() > 0) {
//            for (MultipartFile image : images) {
//                if (image != null && image.getSize() > 0) {
//                    // image_thumb 테이블에 새 레코드 입력
//                    ExtraCurricularImageThumb extraCurricularImageThumb = new ExtraCurricularImageThumb();
//                    // entity 내용 채우기
//                    ExtraCurricularImageThumbId id = new ExtraCurricularImageThumbId();
//                    id.setProgramSeq(ETCProgram.getSeq());
//                    id.setName(image.getOriginalFilename());
//                    extraCurricularImageThumb.setProgram(ETCProgram);
//                    extraCurricularImageThumb.setId(id);
//
//                }
//            }
//        }
//    }

    // 프로그램 목록
    public Map<String, Object> list(Integer pageNumber, String keyword) {

        Page<ETCListDto> programPage = extraCurricularProgramRepository.findAllBy(
                PageRequest.of(pageNumber - 1, 10),
                keyword
        );

        int totalPages = programPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);

        var pageInfo = Map.of(
                "totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber
        );

        return Map.of(
                "pageInfo", pageInfo,
                "programList", programPage.getContent()
        );
    }

    // Enum -> 한글 매핑
    private String mapToLabel(OperationType value) {
        return switch (value) {
            case OFFLINE -> "대면";
            case ONLINE -> "비대면";
            case HYBRID -> "혼합";
        };
    }


    // 프로그램 상세 정보
    public Object detail(Integer seq) {
        ExtraCurricularProgram data = extraCurricularProgramRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException(seq + "번 프로그램이 없습니다."));

        // 썸네일 이미지 가져오기
        String fileUrl = null;
        if (data.getETCThumb() != null) {
            fileUrl = imagePrefix + "prj5/ETC_Thumb/" + data.getSeq() + "/" + data.getETCThumb().getId().getName();
        }

        // 본문 이미지 가져오기

        ETCDetailDto dto = new ETCDetailDto();
        dto.setSeq(data.getSeq());
        dto.setTitle(data.getTitle());
        dto.setContent(data.getContent());
        dto.setOperateStartDt(data.getOperateStartDt());
        dto.setOperateEndDt(data.getOperateEndDt());
        dto.setApplyStartDt(data.getApplyStartDt());
        dto.setApplyEndDt(data.getApplyEndDt());
        dto.setCompetency(data.getCompetency());
        dto.setLocation(data.getLocation());
        dto.setOperationType(mapToLabel(data.getOperationType()));
        dto.setGrades(data.getGrades());
        dto.setCapacity(data.getCapacity());
        dto.setApplicants(data.getApplicants());
        dto.setWaiting(data.getWaiting());
        dto.setStatus(data.getStatus());
        dto.setMileagePoints(data.getMileagePoints());
        dto.setManager(data.getManager());
        dto.setManagerPhone(data.getManagerPhone());
        dto.setAuthor(data.getAuthor());
        dto.setCreatedAt(data.getCreatedAt());
        dto.setUpdatedAt(data.getUpdatedAt());
        dto.setUseYn(data.getUseYn());
        dto.setThumbnails(fileUrl);

        return dto;

    }

    // 프로그램 수정
    public void edit(Integer seq, ETCEditForm form) {
        ExtraCurricularProgram data = extraCurricularProgramRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("프로그램 수정 오류"));

        data.setTitle(form.getTitle());
        data.setContent(form.getContent());
        data.setOperateStartDt(form.getOperateStartDt());
        data.setOperateEndDt(form.getOperateEndDt());
        data.setApplyStartDt(form.getApplyStartDt());
        data.setApplyEndDt(form.getApplyEndDt());
        data.setCompetency(form.getCompetency());
        data.setLocation(form.getLocation());
        data.setOperationType(mapToEnum(form.getOperationType()));
        data.setGrades(form.getGrades());
        data.setCapacity(form.getCapacity());
        data.setStatus(form.getStatus());
        data.setManager(form.getManager());
        data.setManagerPhone(form.getManagerPhone());
        data.setMileagePoints(form.getMileagePoints());
        data.setAuthor(form.getAuthor());
        data.setUseYn(form.getUseYn());

        LocalDateTime now = LocalDateTime.now();
        data.setUpdatedAt(now);

        extraCurricularProgramRepository.save(data);
    }

    // 프로그램 삭제
    public void delete(Integer seq) {
        ExtraCurricularProgram data = extraCurricularProgramRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("프로그램 삭제 오류"));

        data.setUseYn(false);
        LocalDateTime now = LocalDateTime.now();
        data.setUpdatedAt(now);

        extraCurricularProgramRepository.save(data);
    }
}
