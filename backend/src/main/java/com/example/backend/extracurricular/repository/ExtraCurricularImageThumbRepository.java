package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.entity.ExtraCurricularImageThumb;
import com.example.backend.extracurricular.entity.ExtraCurricularImageThumbId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtraCurricularImageThumbRepository extends JpaRepository<ExtraCurricularImageThumb, ExtraCurricularImageThumbId> {
}