package com.example.backend.competency.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.entity.Competency;
import com.example.backend.competency.repository.CompetencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class CompetencyService {
    private final CompetencyRepository competencyRepository;

    public void add(CompetencyDto dto) {
        Competency competency = new Competency();
        competency.setCompetencyName(dto.getCompetencyName());
        competency.setCompetencyExpln(dto.getCompetencyExpln());
        competencyRepository.save(competency);
        System.out.println("저장완료");
    }
    
}
