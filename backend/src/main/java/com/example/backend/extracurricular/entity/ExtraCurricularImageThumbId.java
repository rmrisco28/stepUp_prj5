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
    private static final long serialVersionUID = -3497836960855134286L;
    @Column(name = "program_seq")
    private Integer programSeq;

    @Column(name = "name", length = 100)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ExtraCurricularImageThumbId entity = (ExtraCurricularImageThumbId) o;
        return Objects.equals(this.name, entity.name) &&
               Objects.equals(this.programSeq, entity.programSeq);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, programSeq);
    }

}