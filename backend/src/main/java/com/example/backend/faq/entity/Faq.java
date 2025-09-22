package com.example.backend.faq.entity;

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
@Table(name = "faq", schema = "prj5")
public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "faq_seq", nullable = false)
    private Integer seq;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "answer", nullable = false, length = 1000)
    private String answer;

    @ColumnDefault("current_timestamp()")
    @Column(name = "inserted_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime insertedAt;

}