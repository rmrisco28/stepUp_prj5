package com.example.backend.competency.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.entity.Competency;
import com.example.backend.competency.entity.SubCompetency;
import com.example.backend.competency.repository.CompetencyRepository;
import com.example.backend.competency.repository.SubCompetencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Transactional
public class CompetencyService {
    private final CompetencyRepository competencyRepository;
    private final SubCompetencyRepository subCompetencyRepository;

    public void add(CompetencyDto dto) {
        Competency competency = new Competency();
        competency.setCompetencyName(dto.getCompetencyName());
        competency.setCompetencyExpln(dto.getCompetencyExpln());
        competencyRepository.save(competency);
        System.out.println("저장완료");
    }

    public List<?> list() {
        List<CompetencyDto> competencyList = competencyRepository.findAllCompetencies();
        return competencyList;

    }

    public ResponseEntity<?> update(int seq, CompetencyDto competencyDto) {
        Competency competency = competencyRepository.findBySeq(seq);

        competency.setUseYn(competencyDto.getUseYn());
        competencyRepository.save(competency);

        return ResponseEntity.ok().build();
    }


    public void delete(int seq, Authentication authentication) {
        if (authentication == null) {
            throw new RuntimeException("권한이 없습니다.");
        }
        Competency competency = competencyRepository.findBySeq(seq);
        competencyRepository.delete(competency);
    }

    public ResponseEntity<Map<String, String>> delete(int seq) {
        Competency competency = competencyRepository.findBySeq(seq);


        // 참조된 데이터가 있으면 삭제 불가
        List<SubCompetency> subCompetencies = subCompetencyRepository.findByCompetencySeq(competency);

        if (subCompetencies != null && !subCompetencies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                    "message", "연결된 하위 역량이 존재하여 삭제할 수 없습니다."
            ));
        }
        competencyRepository.delete(competency);
        return ResponseEntity.ok().body(Map.of(
                "message", "핵심역량이 삭제되었습니다."
        ));
    }

}
