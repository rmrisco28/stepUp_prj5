package com.example.backend.batch.employee.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "jf_department", schema = "prj5")
public class JfDepartment {
    @Id
    @Column(name = "jf_code", nullable = false, length = 5)
    private String jfCode;

    @Column(name = "jf_name", length = 20)
    private String jfName;

}