package com.example.backend.auth.entity;

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
public class AuthId implements Serializable {
    private static final long serialVersionUID = -3331385302224665358L;
    @Column(name = "auth_name", nullable = false, length = 20)
    private String authName;

    @Column(name = "member_seq", nullable = false)
    private Integer memberSeq;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AuthId entity = (AuthId) o;
        return Objects.equals(this.memberSeq, entity.memberSeq) &&
                Objects.equals(this.authName, entity.authName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberSeq, authName);
    }

}