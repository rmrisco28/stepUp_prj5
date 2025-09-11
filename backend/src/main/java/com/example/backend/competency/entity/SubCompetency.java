package com.example.backend.competency.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@ToString
@Entity
@Table(name = "sub_competency", schema = "prj5")
public class SubCompetency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_competency_seq", nullable = false)
    private Integer seq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "competency_seq", nullable = false)
    private Competency competencySeq;

    @Column(name = "sub_competency_name", nullable = false, length = 50)
    private String subCompetencyName;

    @Column(name = "sub_competency_expln", length = 5000)
    private String subCompetencyExpln;

    @ColumnDefault("1")
    @Column(name = "use_Yn", nullable = false)
    private Boolean useYn = true;

}