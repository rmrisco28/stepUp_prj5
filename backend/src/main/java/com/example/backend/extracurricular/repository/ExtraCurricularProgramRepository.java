package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.dto.ETCListDto;
import com.example.backend.extracurricular.dto.ETCListForm;
import com.example.backend.extracurricular.entity.ExtraCurricularProgram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface ExtraCurricularProgramRepository extends JpaRepository<ExtraCurricularProgram, Integer> {
    List<ETCListForm> findAllBy();

}