package com.example.backend.competencyAssessment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Entity
@Table(name = "assessment", schema = "prj5")
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ca_seq", nullable = false)
    private Integer seq;

    @Column(name = "ca_title", nullable = false, length = 50)
    private String caTitle;

    @ColumnDefault("current_timestamp()")
    @Column(name = "create_dttm", nullable = false, insertable = false, updatable = false)
    private LocalDate createDttm;

    @Column(name = "start_dttm", nullable = false)
    private LocalDate startDttm;

    @Column(name = "end_dttm", nullable = false)
    private LocalDate endDttm;

    @ColumnDefault("1")
    @Column(name = "use_Yn", nullable = false)
    private Boolean useYn = true;

}