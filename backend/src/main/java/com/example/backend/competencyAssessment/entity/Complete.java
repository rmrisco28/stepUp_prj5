package com.example.backend.competencyAssessment.entity;

import com.example.backend.batch.student.entity.Student;
import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "complete", schema = "prj5")
public class Complete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complete_seq", nullable = false)
    private Integer seq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "member_seq", nullable = false)
    private Member memberSeq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ca_seq", nullable = false)
    private Assessment caSeq;

    @ColumnDefault("current_timestamp()")
    @Column(name = "assessmentDttm", nullable = false, insertable = false, updatable = false)
    private LocalDateTime assessmentDttm;

}