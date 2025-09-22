package com.example.backend.extracurricular.entity;

import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "extra_curricular_application", schema = "prj5")
public class ExtraCurricularApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_seq", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "program_seq", nullable = false)
    private ExtraCurricularProgram programSeq;

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_seq", nullable = false)
    private Member memberSeq;

    @ColumnDefault("current_timestamp()")
    @Column(name = "apply_dt", nullable = false, insertable = false, updatable = false)
    private LocalDateTime applyDt;

    @Column(name = "status")
    private Integer status;

    @Column(name = "motive", length = 500)
    private String motive;

}