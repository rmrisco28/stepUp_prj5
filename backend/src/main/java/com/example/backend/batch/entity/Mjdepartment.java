package com.example.backend.batch.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "mjdepartment", schema = "prj5")
@NoArgsConstructor
@AllArgsConstructor
public class Mjdepartment {
    @Id
    @Column(name = "mj_code", nullable = false, length = 5)
    private String mjCode;

    @Column(name = "mj_name", nullable = false, length = 20)
    private String mjName;

}