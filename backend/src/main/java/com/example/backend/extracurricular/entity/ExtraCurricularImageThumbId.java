package com.example.backend.extracurricular.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@Embeddable
public class ExtraCurricularImageThumbId implements Serializable {
    private static final long serialVersionUID = 73780959261928287L;
    @Column(name = "image_seq", nullable = false)
    private Integer imageSeq;

    @Column(name = "program_seq", nullable = false)
    private Integer programSeq;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ExtraCurricularImageThumbId entity = (ExtraCurricularImageThumbId) o;
        return Objects.equals(this.imageSeq, entity.imageSeq) &&
               Objects.equals(this.programSeq, entity.programSeq);
    }

    @Override
    public int hashCode() {
        return Objects.hash(imageSeq, programSeq);
    }

}