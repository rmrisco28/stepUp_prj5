package com.example.backend.extracurricular.entity;

import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@ToString
@Entity
@Table(name = "extra_curricular_complete", schema = "prj5")
public class ExtraCurricularComplete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complete_seq", nullable = false)
    private Integer seq;

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "program_seq", nullable = false)
    private ExtraCurricularProgram programSeq;

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "application_seq", nullable = false)
    private ExtraCurricularApplication applicationSeq;

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_seq", nullable = false)
    private Member memberSeq;

    @ColumnDefault("0")
    @Column(name = "complete_status", nullable = false)
    private Integer completeStatus;

}