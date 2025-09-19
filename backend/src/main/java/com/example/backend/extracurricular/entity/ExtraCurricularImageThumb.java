package com.example.backend.extracurricular.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@ToString
@Entity
@Table(name = "extra_curricular_image_thumb", schema = "prj5")
public class ExtraCurricularImageThumb {
    @EmbeddedId
    private ExtraCurricularImageThumbId id;

    @MapsId("programSeq")
    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "program_seq", nullable = false)
    private ExtraCurricularProgram program;

}