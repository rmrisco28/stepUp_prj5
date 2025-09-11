package com.example.backend.extracurricular.entity;

import com.example.backend.extracurricular.enums.OperationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "extra_curricular_program", schema = "prj5")
public class ExtraCurricularProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "program_seq", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "content", nullable = false, length = 4000)
    private String content;

    @Column(name = "author", nullable = false)
    private Integer author;

    @Column(name = "operate_start_dt", nullable = false)
    private LocalDateTime operateStartDt;

    @Column(name = "operate_end_dt", nullable = false)
    private LocalDateTime operateEndDt;

    @Column(name = "apply_start_dt", nullable = false)
    private LocalDateTime applyStartDt;

    @Column(name = "apply_end_dt", nullable = false)
    private LocalDateTime applyEndDt;

    @Column(name = "location", length = 250)
    private String location;

    @Column(name = "competency", nullable = false, length = 100)
    private String competency;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation_type", nullable = false, length = 100)
    private OperationType operationType;

    @Column(name = "grades", length = 100)
    private String grades;

    @ColumnDefault("0")
    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @ColumnDefault("0")
    @Column(name = "applicants", nullable = false)
    private Integer applicants;

    @ColumnDefault("0")
    @Column(name = "waiting", nullable = false)
    private Integer waiting;

    @Column(name = "status", nullable = false, length = 100)
    private String status;

    @Column(name = "manager", length = 100)
    private String manager;

    @Column(name = "manager_phone", length = 100)
    private String managerPhone;

    @ColumnDefault("0")
    @Column(name = "mileage_points")
    private Integer mileagePoints;

    @ColumnDefault("0")
    @Column(name = "view")
    private Integer view;

    @ColumnDefault("current_timestamp()")
    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private Instant createdAt;

    @ColumnDefault("current_timestamp()")
    @Column(name = "updated_at", nullable = false, insertable = false)
    private Instant updatedAt;

    @ColumnDefault("1")
    @Column(name = "use_yn", nullable = false)
    private Boolean useYn = false;

}