package com.example.backend.competency.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.dto.SubCompetencyDto;
import com.example.backend.competency.dto.SubCompetencyListDto;
import com.example.backend.competency.entity.Competency;
import com.example.backend.competency.entity.SubCompetency;
import com.example.backend.competency.repository.CompetencyRepository;
import com.example.backend.competency.repository.SubCompetencyRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SubCompetencyService {
    private final CompetencyRepository competencyRepository;
    private final SubCompetencyRepository subCompetencyRepository;


    public void subAdd(SubCompetencyDto dto) {
        SubCompetency subCompetency = new SubCompetency();

        Competency competency = competencyRepository.findBySeq(dto.getCompetencySeqId());
        if (competency == null) {
            throw new EntityNotFoundException("해당 ID의 핵심역량이 존재하지 않습니다.");
        }
        // 하위 역량 정보 설정
        subCompetency.setSubCompetencyName(dto.getSubCompetencyName());
        subCompetency.setSubCompetencyExpln(dto.getSubCompetencyExpln());
        subCompetency.setCompetencySeq(competency);

        subCompetencyRepository.save(subCompetency);

    }

    // 하위 역량 추가 시, 핵심 역량 선택지
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
}
