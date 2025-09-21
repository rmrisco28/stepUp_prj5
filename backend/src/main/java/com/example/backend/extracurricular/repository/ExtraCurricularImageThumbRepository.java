package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.entity.ExtraCurricularImageThumb;
import com.example.backend.extracurricular.entity.ExtraCurricularImageThumbId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExtraCurricularImageThumbRepository extends JpaRepository<ExtraCurricularImageThumb, ExtraCurricularImageThumbId> {

    @Query("SELECT t FROM ExtraCurricularImageThumb t WHERE t.id.programSeq IN :seqList")
    List<ExtraCurricularImageThumb> findByProgramSeqList(@Param("seqList") List<Integer> seqList);

}