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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
        if (etcAddForm.getThumbnail() != null && !etcAddForm.getThumbnail().isEmpty()) {
            saveSingleImage(ETCProgram, etcAddForm.getThumbnail(), "thumbnail");
        }

        // 3. 본문 이미지 저장 (다중 파일)
        if (etcAddForm.getContentImages() != null && !etcAddForm.getContentImages().isEmpty()) {
            saveImages(ETCProgram, etcAddForm.getContentImages(), "contentImages");
        }

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
    private void saveSingleImage(ExtraCurricularProgram program, MultipartFile image, String target) {
        saveImages(program, List.of(image), target);
    }

    // 다중 파일 저장
    private void saveImages(ExtraCurricularProgram program, List<MultipartFile> images, String target) {
        if (images == null || images.isEmpty()) return;

        for (MultipartFile image : images) {
            if (image == null || image.isEmpty()) continue;

            // 1) DB 저장
            if ("thumbnail".equals(target)) {
                ExtraCurricularImageThumb thumb = new ExtraCurricularImageThumb();
                ExtraCurricularImageThumbId id = new ExtraCurricularImageThumbId();
                id.setProgramSeq(program.getSeq());
                id.setName(image.getOriginalFilename());
                thumb.setProgram(program);
                thumb.setId(id);
                extraCurricularImageThumbRepository.save(thumb);

            } else if ("contentImages".equals(target)) {
                ExtraCurricularImageContent content = new ExtraCurricularImageContent();
                ExtraCurricularImageContentId id = new ExtraCurricularImageContentId();
                id.setProgramSeq(program.getSeq());
                id.setName(image.getOriginalFilename());
                content.setProgram(program);
                content.setId(id);
                extraCurricularImageContentRepository.save(content);
            }

            // 2) 로컬 디렉토리 저장
            String basePath = "C:/Users/admin/IdeaProjects/stepUp_prj5/frontend/public/ETCProgramImages/";
            basePath += "thumbnail".equals(target) ? "thumb/" : "content/";

            File dir = new File(basePath + program.getSeq());
            if (!dir.exists()) dir.mkdirs();

            try {
                File dest = new File(dir, image.getOriginalFilename());
                image.transferTo(dest);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("이미지 저장 실패: " + image.getOriginalFilename());
            }
        }
    }


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
