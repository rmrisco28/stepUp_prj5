package com.example.backend.competency.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "competency", schema = "prj5")
public class Competency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "competency_seq", nullable = false)
    private Integer id;

    @Column(name = "competency_name", nullable = false, length = 50)
    private String competencyName;

    @Column(name = "competency_expln", length = 500)
    private String competencyExpln;

    @Column(name = "competency_img1")
    private byte[] competencyImg1;

    @Column(name = "competency_img2")
    private byte[] competencyImg2;

    @Column(name = "competency_img3")
    private byte[] competencyImg3;

}