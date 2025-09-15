package com.example.backend.extracurricular.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.extracurricular.dto.ETCAddForm;
import com.example.backend.extracurricular.dto.ETCListDto;
import com.example.backend.extracurricular.dto.ETCListForm;
import com.example.backend.extracurricular.entity.ExtraCurricularProgram;
import com.example.backend.extracurricular.enums.OperationType;
import com.example.backend.extracurricular.repository.ExtraCurricularProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
}
