package com.example.backend.competency.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.dto.SubCompetencyDto;
import com.example.backend.competency.dto.SubCompetencyListDto;
import com.example.backend.competency.dto.SubCompetencyMainDto;
import com.example.backend.competency.entity.Competency;
import com.example.backend.competency.entity.SubCompetency;
import com.example.backend.competency.repository.CompetencyRepository;
import com.example.backend.competency.repository.SubCompetencyRepository;
import com.example.backend.competencyAssessment.entity.Question;
import com.example.backend.competencyAssessment.repository.QuestionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class SubCompetencyService {
    private final CompetencyRepository competencyRepository;
    private final SubCompetencyRepository subCompetencyRepository;
    private final QuestionRepository questionRepository;


    public void subAdd(SubCompetencyDto dto) {
        SubCompetency subCompetency = new SubCompetency();

        Competency competency = competencyRepository.findBySeq(dto.getCompetencySeqId());
        if (competency == null) {
            throw new EntityNotFoundException("해당 ID의 핵심역량이 존재하지 않습니다.");
        }
        // 하위역량 정보 설정
        subCompetency.setSubCompetencyName(dto.getSubCompetencyName());
        subCompetency.setSubCompetencyExpln(dto.getSubCompetencyExpln());
        subCompetency.setCompetencySeq(competency);

        subCompetencyRepository.save(subCompetency);

    }

    // 하위역량 추가 시, 핵심역량 선택지
    public List<?> subAddList() {
        List<CompetencyDto> competencyList = competencyRepository.findAllCompetenciesUse();
        return competencyList;
    }

    public List<?> subList() {
        List<SubCompetencyListDto> subCompetencyListDto = subCompetencyRepository.findAllSubCompetencies();
        return subCompetencyListDto;
    }

    public ResponseEntity<?> subUpdate(int seq, SubCompetencyListDto subCompetencyListDto) {
        SubCompetency subCompetency = subCompetencyRepository.findBySeq(seq);

        subCompetency.setUseYn(subCompetencyListDto.getUseYn());
        subCompetencyRepository.save(subCompetency);

        return ResponseEntity.ok().build();
    }

    public List<?> intro() {
        List<SubCompetencyMainDto> subCompetencyMainDto = subCompetencyRepository.findUseSubCompetencies();
        return subCompetencyMainDto;
    }

    public ResponseEntity<Map<String, String>> delete(int seq) {
        SubCompetency subCompetency = subCompetencyRepository.findBySeq(seq);

        // 하위 역량이 존재하지 않으면 삭제 불가
        if (subCompetency == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "message", "해당 하위 역량을 찾을 수 없습니다."
            ));
        }

        // 해당 하위 역량이 문제에서 사용 중인 경우
        List<Question> questionsUsingSubCompetency = questionRepository.findBySubCompetencySeq(subCompetency);

        if (questionsUsingSubCompetency != null && !questionsUsingSubCompetency.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                    "message", "하위 역량이 사용 중이므로 삭제할 수 없습니다."
            ));
        }

        // 하위 역량 삭제
        subCompetencyRepository.delete(subCompetency);

        return ResponseEntity.ok().body(Map.of(
                "message", "하위 역량이 삭제되었습니다."
        ));
    }
}
