package com.example.backend.competencyAssessment.entity;

import com.example.backend.competency.entity.SubCompetency;
import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "result", schema = "prj5")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_seq", nullable = false)
    private Integer seq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "member_seq", nullable = false)
    private Member memberSeq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sub_competency_seq", nullable = false)
    private SubCompetency subCompetencySeq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ca_seq", nullable = false)
    private Assessment caSeq;

    @Column(name = "score", nullable = false)
    private Double score;

}