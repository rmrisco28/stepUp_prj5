package com.example.backend.notice.dto;

import java.time.LocalDateTime;

public interface NoticeListInfo {
    Integer getId();

    String getTitle();

    LocalDateTime getInsertedAt();

    // notice가 member랑 매핑되어 있고, member는 employee랑 매핑되어 있으므로 통해 통해 가져옴
    MemberInfo getAuthor();

    interface MemberInfo {
        Integer getId();

        EmployeeInfo getEmployee();

        interface EmployeeInfo {
            String getName();
        }
    }

}
