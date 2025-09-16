package com.example.backend.extracurricular.service;

import com.example.backend.extracurricular.dto.ETCAddForm;
import com.example.backend.extracurricular.dto.ETCDetailDto;
import com.example.backend.extracurricular.dto.ETCListDto;
import com.example.backend.extracurricular.entity.ExtraCurricularProgram;
import com.example.backend.extracurricular.enums.OperationType;
import com.example.backend.extracurricular.repository.ExtraCurricularProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class ExtraCurricularService {

    private final ExtraCurricularProgramRepository extraCurricularProgramRepository;

    // 비교과 프로그램 등록(관리목록에 등록
    public void add(ETCAddForm etcAddForm) {

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

        extraCurricularProgramRepository.save(ETCProgram);
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

        return dto;

    }


}
