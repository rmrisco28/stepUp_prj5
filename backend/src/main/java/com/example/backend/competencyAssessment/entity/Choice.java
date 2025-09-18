package com.example.backend.competencyAssessment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "choice", schema = "prj5")
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "choice_seq", nullable = false)
    private Integer seq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "question_seq", nullable = false)
    private Question questionSeq;

    @Column(name = "`order`", nullable = false)
    private Integer order;

    @Column(name = "`option`", nullable = false, length = 50)
    private String option;

    @Column(name = "point", nullable = false)
    private Double point;


}