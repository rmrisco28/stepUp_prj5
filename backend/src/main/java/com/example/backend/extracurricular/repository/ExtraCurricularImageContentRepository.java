package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.entity.ExtraCurricularImageContent;
import com.example.backend.extracurricular.entity.ExtraCurricularImageContentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtraCurricularImageContentRepository extends JpaRepository<ExtraCurricularImageContent, ExtraCurricularImageContentId> {
}