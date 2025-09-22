package com.example.backend.faq.service;

import com.example.backend.faq.dto.FaqAddForm;
import com.example.backend.faq.dto.FaqDto;
import com.example.backend.faq.dto.FaqListInfo;
import com.example.backend.faq.entity.Faq;
import com.example.backend.faq.repository.FaqRepository;
import com.example.backend.notice.entity.Notice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FaqService {
    private final FaqRepository faqRepository;


    // FAQ 등록
    public void faqAdd(FaqAddForm dto) {
        Faq faq = new Faq();
        faq.setQuestion(dto.getQuestion());
        faq.setAnswer(dto.getAnswer());
        faqRepository.save(faq);
    }


    // FAQ 목록
    public List<FaqListInfo> list() {
        return faqRepository.findAllBy();
    }

    // FAQ 관리 목록
    public List<FaqListInfo> manageList() {
        return faqRepository.findAllBy();
    }

    // FAQ 상세보기
    public FaqDto Detail(Integer seq) {
        Faq faq = faqRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("FAQ가 존재하지 않습니다."));

        FaqDto dto = new FaqDto();
        dto.setSeq(faq.getSeq());
        dto.setQuestion(faq.getQuestion());
        dto.setAnswer(faq.getAnswer());
        dto.setInsertedAt(faq.getInsertedAt());

        return dto;
    }

    // FAQ 수정
    public void edit(Integer seq, FaqAddForm dto) {
        Faq faq = faqRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("FAQ가 존재하지 않습니다."));
        faq.setQuestion(dto.getQuestion());
        faq.setAnswer(dto.getAnswer());
        faqRepository.save(faq);
    }

    // FAQ 삭제
    public void delete(Integer seq) {
        Faq faq = faqRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("FAQ 존재하지 않습니다."));

        faqRepository.delete(faq);
    }
}
