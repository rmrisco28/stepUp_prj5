package com.example.backend.competency.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.dto.SubCompetencyDto;
import com.example.backend.competency.entity.Competency;
import com.example.backend.competency.repository.CompetencyRepository;
import com.example.backend.competency.repository.SubCompetencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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


}
