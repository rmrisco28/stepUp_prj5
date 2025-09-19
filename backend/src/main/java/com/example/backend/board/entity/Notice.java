package com.example.backend.board.entity;

import com.example.backend.batch.employee.entity.Employee;
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
@Table(name = "notice", schema = "prj5")
public class Notice {
    @Id
    @Column(name = "notice_seq", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false, length = 1000)
    private String content;

    @ColumnDefault("current_timestamp()")
    @Column(name = "inserted_at", nullable = false)
    private LocalDateTime insertedAt;

    //    @ManyToOne(optional = false)
//    @JoinColumn(name = "author_seq", nullable = false)
    private Integer authorSeq;

}