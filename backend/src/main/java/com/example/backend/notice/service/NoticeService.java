package com.example.backend.notice.service;

import com.example.backend.notice.dto.NoticeAddForm;
import com.example.backend.notice.dto.NoticeListInfo;
import com.example.backend.notice.entity.Notice;
import com.example.backend.notice.repository.NoticeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NoticeService {
    private final NoticeRepository noticeRepository;

    // 공지사항 추가
    public void addNotice(NoticeAddForm dto) {
        Notice notice = new Notice();
        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        noticeRepository.save(notice);
    }

    // 공지사항 목록 보기
    public List<NoticeListInfo> listNotice() {
        return noticeRepository.findAllByOrderByInsertedAtDesc();
    }

    // 공지사항 하나 보기

}
