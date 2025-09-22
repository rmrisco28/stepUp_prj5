package com.example.backend.competencyAssessment.entity;

import com.example.backend.batch.student.entity.Student;
import com.example.backend.member.entity.Member;
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
    @JoinColumn(name = "member_seq", nullable = false)
    private Member memberSeq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "question_seq", nullable = false)
    private Question questionSeq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "choice_seq", nullable = false)
    private Choice choiceSeq;

}