package com.example.backend.notice.entity;

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
@Table(name = "notice", schema = "prj5")
public class Notice {
    @Id
    @Column(name = "notice_seq", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false, length = 1000)
    private String content;

    @ColumnDefault("current_timestamp()")
    @Column(name = "inserted_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime insertedAt;
    // insertable false는 데이터 저장시 이 컬럼을 제외하겠다.
    // 그러면 updatable 없애면 저장될때마다 시간 바뀜. 수정시간 넣고 싶으면 뭐 .. 컬럼 추가해서 insertable false랑 updatable true 하면 될 듯

    @ManyToOne(optional = false)
    @JoinColumn(name = "author_seq", nullable = false)
    private Member authorSeq;

}