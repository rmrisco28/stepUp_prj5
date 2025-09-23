package com.example.backend.notice.service;

import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import com.example.backend.notice.dto.NoticeAddForm;
import com.example.backend.notice.dto.NoticeDto;
import com.example.backend.notice.dto.NoticeListInfo;
import com.example.backend.notice.entity.Notice;
import com.example.backend.notice.repository.NoticeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;

    // 공지사항 추가
    public void addNotice(NoticeAddForm dto) {
        Member mb = memberRepository.findById(dto.getMemberSeq())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Notice notice = new Notice();
        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        notice.setAuthor(mb);
        noticeRepository.save(notice);
    }

    // 공지사항 목록 보기
//    public List<NoticeListInfo> listNotice() {
//        return noticeRepository.findAllByOrderByInsertedAtDesc();
//    }

    public Map<String, Object> listNotice(Integer num) {
        // Spring Pageable은 0부터 시작하니까 num-1
        Pageable pageable = PageRequest.of(num - 1, 5, Sort.by("insertedAt").descending());

        Page<NoticeListInfo> noticePage = noticeRepository.findAllByOrderByInsertedAtDesc(pageable);

        // 페이지 정보
        Map<String, Object> pageInfo = Map.of(
                "currentPage", noticePage.getNumber() + 1, // 1부터 시작
                "totalPages", noticePage.getTotalPages(),
                "totalElements", noticePage.getTotalElements()
        );

        // 공지사항 목록
        List<NoticeListInfo> noticeList = noticePage.getContent();

        return Map.of(
                "pageInfo", pageInfo,
                "noticeList", noticeList
        );
    }


    // 공지사항 하나 보기
    public NoticeDto getNoticeDetail(Integer seq) {
        Notice notice = noticeRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("공지사항이 존재하지 않습니다."));

        return NoticeDto.builder()
                .seq(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .insertedAt(notice.getInsertedAt())
                .author(notice.getAuthor().getEmployee().getName())
                .build();
    }

    // 공지사항 삭제
    public void deleteNotice(Integer id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항이 존재하지 않습니다."));

        noticeRepository.delete(notice);
    }

    // 공지사항 수정
    public void updateNotice(Integer id, NoticeAddForm dto) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항이 존재하지 않습니다."));
        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        noticeRepository.save(notice);
    }
}
