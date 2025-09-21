package com.example.backend.competencyAssessment.entity;

import com.example.backend.batch.student.entity.Student;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "response", schema = "prj5")
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_seq", nullable = false)
    private Integer seq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_seq", nullable = false)
    private Student studentSeq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "question_seq", nullable = false)
    private Question questionSeq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "choice_seq", nullable = false)
    private Choice choiceSeq;

}