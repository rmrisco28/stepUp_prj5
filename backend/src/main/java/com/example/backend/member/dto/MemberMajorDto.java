package com.example.backend.member.dto;

import com.example.backend.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link Member}
 */
@Data
@AllArgsConstructor
public class MemberMajorDto implements Serializable {
    Integer id;
    Integer studentId;
    String studentStudentNo;
    String studentMajor;
}