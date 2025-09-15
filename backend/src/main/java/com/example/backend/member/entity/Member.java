package com.example.backend.member.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "member", schema = "prj5")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_seq", nullable = false)
    private Integer id;

    @Column(name = "login_id", nullable = false, length = 20)
    private String loginId;

    @Column(name = "password")
    private String password;

}