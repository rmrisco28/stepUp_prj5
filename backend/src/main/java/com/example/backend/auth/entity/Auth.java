package com.example.backend.auth.entity;

import com.example.backend.member.entity.Member;
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
@Table(name = "auth", schema = "prj5")
public class Auth {
    @EmbeddedId
    private AuthId id;

    @MapsId("memberSeq")
    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_seq", nullable = false, referencedColumnName = "member_seq", insertable = false, updatable = false)
    private Member memberSeq;

}