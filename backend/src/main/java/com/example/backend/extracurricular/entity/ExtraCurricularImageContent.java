package com.example.backend.extracurricular.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "extra_curricular_image_content", schema = "prj5")
public class ExtraCurricularImageContent {
    @EmbeddedId
    private ExtraCurricularImageContentId id;

    @MapsId("programSeq")
    @ManyToOne(optional = false)
    @JoinColumn(name = "program_seq", nullable = false)
    private ExtraCurricularProgram programSeq;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

}