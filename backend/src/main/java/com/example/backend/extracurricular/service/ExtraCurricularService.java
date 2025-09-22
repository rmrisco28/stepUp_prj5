package com.example.backend.extracurricular.service;

import com.example.backend.batch.student.repository.StudentRepository;
import com.example.backend.competency.entity.Competency;
import com.example.backend.competency.entity.SubCompetency;
import com.example.backend.competency.repository.SubCompetencyRepository;
import com.example.backend.extracurricular.dto.*;
import com.example.backend.extracurricular.entity.*;
import com.example.backend.extracurricular.enums.OperationType;
import com.example.backend.extracurricular.repository.ExtraCurricularApplicationRepository;
import com.example.backend.extracurricular.repository.ExtraCurricularImageContentRepository;
import com.example.backend.extracurricular.repository.ExtraCurricularImageThumbRepository;
import com.example.backend.extracurricular.repository.ExtraCurricularProgramRepository;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExtraCurricularService {

    private final ExtraCurricularProgramRepository extraCurricularProgramRepository;
    private final ExtraCurricularImageThumbRepository extraCurricularImageThumbRepository;
    private final ExtraCurricularImageContentRepository extraCurricularImageContentRepository;
    private final S3Client s3Client;
    private final ExtraCurricularApplicationRepository extraCurricularApplicationRepository;

    private final StudentRepository studentRepository;
    private final MemberRepository memberRepository;
    private final SubCompetencyRepository subCompetencyRepository;

    @Value("${image.prefix}")
    private String imagePrefix;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    // 비교과 프로그램 등록(관리목록에 등록)
    public void register(ETCAddForm etcAddForm) {

        SubCompetency subCompetencyId = subCompetencyRepository.findById(etcAddForm.getCompetency())
                .orElseThrow(() -> new IllegalArgumentException("Invalid competency ID"));

        ExtraCurricularProgram ETCProgram = new ExtraCurricularProgram();
        ETCProgram.setTitle(etcAddForm.getTitle());
        ETCProgram.setContent(etcAddForm.getContent());
        ETCProgram.setOperateStartDt(etcAddForm.getOperateStartDt());
        ETCProgram.setOperateEndDt(etcAddForm.getOperateEndDt());
        ETCProgram.setApplyStartDt(etcAddForm.getApplyStartDt());
        ETCProgram.setApplyEndDt(etcAddForm.getApplyEndDt());
        ETCProgram.setSubCompetency(subCompetencyId);
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

        // 3. 본문 이미지 저장 (다중 파일)
        saveContextImages(ETCProgram, etcAddForm);

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

    // 프로그램 목록(관리자 화면)
    public Map<String, Object> list(Integer pageNumber, String keyword) {

        Page<ETCListDto> programPage = extraCurricularProgramRepository.findAllBy(
                PageRequest.of(pageNumber - 1, 10),
                keyword
        );

        // 프로그램 seq 조회
        List<Integer> seqList = programPage.getContent().stream()
                .map(ETCListDto::getSeq)
                .toList();

        // 썸네일 조회
        List<ExtraCurricularImageThumb> thumbs = extraCurricularImageThumbRepository.findByProgramSeqList(seqList);

        // 썸네일 이미지 경로랑 그 이미지를 담고 있는 프로그램 seq 같이
        Map<Integer, List<String>> thumbMap = thumbs.stream()
                .collect(Collectors.groupingBy(
                        t -> t.getId().getProgramSeq(),
                        Collectors.mapping(
                                t -> imagePrefix + "prj5/ETC_Thumb/"
                                        + t.getId().getProgramSeq() + "/"
                                        + t.getId().getName(), // URL 조합
                                Collectors.toList()
                        )
                ));

        // thumbUrl을 포함한 새로운 List 생성
        List<ETCListDto> programsWithThumbs = programPage.getContent().stream()
                .map(program -> {
                    // 썸네일 URL 찾기
                    String thumbUrl = Optional.ofNullable(thumbMap.get(program.getSeq()))
                            .filter(urls -> !urls.isEmpty())
                            .map(urls -> urls.get(0)) // 첫 번째 이미지만 사용: 근데 썸넬이미지는 항상 하나긴 함
                            .orElse(null);

                    // thumbUrl 설정
                    program.setThumbUrl(thumbUrl);
                    return program;
                })
                .toList();


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
                "programList", programsWithThumbs
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
        String thumbnailUrl = null;
        if (data.getETCThumb() != null) {
            thumbnailUrl = imagePrefix + "prj5/ETC_Thumb/" + data.getSeq() + "/" + data.getETCThumb().getId().getName();
        }

        // 본문 이미지 가져오기
        List<String> contentUrl = data.getETCContents().stream()
                .map(cf -> imagePrefix + "prj5/ETC_Content/" + data.getSeq() + "/" + cf.getId().getName())
                .collect(Collectors.toList());

        ETCDetailDto dto = new ETCDetailDto();
        dto.setSeq(data.getSeq());
        dto.setTitle(data.getTitle());
        dto.setContent(data.getContent());
        dto.setOperateStartDt(data.getOperateStartDt());
        dto.setOperateEndDt(data.getOperateEndDt());
        dto.setApplyStartDt(data.getApplyStartDt());
        dto.setApplyEndDt(data.getApplyEndDt());
        dto.setCompetency(data.getSubCompetency().getSubCompetencyName());
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
        dto.setThumbnails(thumbnailUrl);
        dto.setContentImages(contentUrl);

        return dto;

    }

    // 새 썸네일 이미지 가져올 때 필요한 것. 위에 메소드랑 다르게 쓰임
    private void saveThumbImages(ExtraCurricularProgram program, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            ExtraCurricularImageThumb thumb = new ExtraCurricularImageThumb();
            ExtraCurricularImageThumbId id = new ExtraCurricularImageThumbId();
            id.setProgramSeq(program.getSeq());
            id.setName(file.getOriginalFilename());
            thumb.setProgram(program);
            thumb.setId(id);

            program.setETCThumb(thumb); // 🔑 프로그램 객체에 연관 설정

            extraCurricularImageThumbRepository.save(thumb);

            String objectKey = "prj5/ETC_Thumb/" + program.getSeq() + "/" + file.getOriginalFilename();
            uploadFile(file, objectKey);
        }
    }

    // 프로그램 수정
    public void edit(Integer seq, ETCEditForm form) {

        SubCompetency subCompetency = subCompetencyRepository.findById(form.getCompetency())
                .orElseThrow(() -> new IllegalArgumentException("Invalid competency ID"));

        ExtraCurricularProgram data = extraCurricularProgramRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("프로그램 수정 오류"));

        // --- 1. 텍스트 정보 수정 ---
        data.setTitle(form.getTitle());
        data.setContent(form.getContent());
        data.setOperateStartDt(form.getOperateStartDt());
        data.setOperateEndDt(form.getOperateEndDt());
        data.setApplyStartDt(form.getApplyStartDt());
        data.setApplyEndDt(form.getApplyEndDt());
        data.setSubCompetency(subCompetency);
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
        data.setUpdatedAt(LocalDateTime.now());

        // --- 2. 썸네일 교체 ---
        if (form.getThumbnail() != null && !form.getThumbnail().isEmpty()) {
            if (data.getETCThumb() != null) {
                String oldFileName = data.getETCThumb().getId().getName();
                String oldObjectKey = "prj5/ETC_Thumb/" + data.getSeq() + "/" + oldFileName;
                deleteFile(oldObjectKey);
                extraCurricularImageThumbRepository.delete(data.getETCThumb());
                data.setETCThumb(null); // 🔑 반드시 null로 초기화
            }
            // 새 썸네일 저장
            saveThumbImages(data, form.getThumbnail()); // ✅ 이렇게 수정
        }

        // --- 3. 본문 이미지 추가 ---
        if (form.getNewContentImages() != null && !form.getNewContentImages().isEmpty()) {
            for (MultipartFile file : form.getNewContentImages()) {
                if (file != null && file.getSize() > 0) {
                    ExtraCurricularImageContent content = new ExtraCurricularImageContent();
                    ExtraCurricularImageContentId id = new ExtraCurricularImageContentId();
                    id.setProgramSeq(data.getSeq());
                    id.setName(file.getOriginalFilename());
                    content.setProgram(data);
                    content.setId(id);
                    extraCurricularImageContentRepository.save(content);

                    String objectKey = "prj5/ETC_Content/" + data.getSeq() + "/" + file.getOriginalFilename();
                    uploadFile(file, objectKey);
                }
            }
        }

        // --- 4. 본문 이미지 삭제 ---
        if (form.getDeleteContentImageNames() != null && !form.getDeleteContentImageNames().isEmpty()) {
            for (String fileName : form.getDeleteContentImageNames()) {
                // DB에서 찾기
                String fileNameOnly = fileName.substring(fileName.lastIndexOf("/") + 1);
                ExtraCurricularImageContentId id = new ExtraCurricularImageContentId();
                id.setProgramSeq(data.getSeq());
                id.setName(fileNameOnly);

                extraCurricularImageContentRepository.findById(id).ifPresent(content -> {
                    // S3 삭제
                    String objectKey = "prj5/ETC_Content/" + data.getSeq() + "/" + fileNameOnly;
                    deleteFile(objectKey);
                    // DB 삭제
                    extraCurricularImageContentRepository.delete(content);
                });
            }
        }

        // --- 5. 최종 저장 ---
        extraCurricularProgramRepository.save(data);
    }


    // 프로그램 삭제 (DB + S3 이미지 삭제)
    public void delete(Integer seq) {
        ExtraCurricularProgram data = extraCurricularProgramRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("프로그램 삭제 오류"));

        // 1. 썸네일 이미지 삭제
        if (data.getETCThumb() != null) {
            String thumbFileName = data.getETCThumb().getId().getName();
            String thumbObjectKey = "prj5/ETC_Thumb/" + data.getSeq() + "/" + thumbFileName;

            // S3 파일 삭제
            deleteFile(thumbObjectKey);

            // DB 레코드 삭제
            extraCurricularImageThumbRepository.delete(data.getETCThumb());
        }

        // 2. 본문 이미지 삭제
        if (data.getETCContents() != null && !data.getETCContents().isEmpty()) {
            for (ExtraCurricularImageContent content : data.getETCContents()) {
                String contentFileName = content.getId().getName();
                String contentObjectKey = "prj5/ETC_Content/" + data.getSeq() + "/" + contentFileName;

                // S3 파일 삭제
                deleteFile(contentObjectKey);

                // DB 레코드 삭제
                extraCurricularImageContentRepository.delete(content);
            }
        }

        // 3. 프로그램 삭제
        extraCurricularProgramRepository.delete(data);
    }

    public AppList appList(Integer seq) {
        ExtraCurricularProgram etc = extraCurricularProgramRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("프로그램이 존재하지 않습니다."));

        return AppList.builder()
                .seq(etc.getSeq())
                .title(etc.getTitle())
                .operateStartDt(etc.getOperateStartDt())
                .operateEndDt(etc.getOperateEndDt())
                .operationType(mapToLabel(etc.getOperationType()))
                .build();
    }

    public void apply(ETCApplyForm dto) {
        // 이미 신청했는지 확인
        boolean alreadyApplied = extraCurricularApplicationRepository
                .existsByMemberSeq_IdAndProgramSeq_SeqAndStatus(dto.getMemberSeq(), dto.getProgramSeq(), 1);

        if (alreadyApplied) {
            throw new RuntimeException("이미 신청한 프로그램입니다.");
        }

        // 회원 시퀀스
        // 프로그램 시퀀스
        // 신청 테이블에 저장하기
        ExtraCurricularApplication eca = new ExtraCurricularApplication();

        ExtraCurricularProgram ecp = extraCurricularProgramRepository.findById(dto.getProgramSeq())
                .orElseThrow(() -> new RuntimeException("프로그램 정보가 없습니다."));
        Member mb = memberRepository.findById(dto.getMemberSeq())
                .orElseThrow(() -> new RuntimeException("회원 정보가 없습니다."));

        eca.setProgramSeq(ecp);
        eca.setMemberSeq(mb);
        eca.setMotive(dto.getMotive());
        extraCurricularApplicationRepository.save(eca);
    }
}
