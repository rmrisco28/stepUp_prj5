package com.example.backend.faq.repository;

import com.example.backend.faq.dto.FaqListInfo;
import com.example.backend.faq.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FaqRepository extends JpaRepository<Faq, Integer> {
    List<FaqListInfo> findAllBy();
}