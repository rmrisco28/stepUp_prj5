package com.example.backend.notice.repository;

import com.example.backend.notice.dto.NoticeListInfo;
import com.example.backend.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    // 공지사항 목록보기
    List<NoticeListInfo> findAllByOrderByInsertedAtDesc();

    Page<NoticeListInfo> findAllByOrderByInsertedAtDesc(Pageable pageable);
}