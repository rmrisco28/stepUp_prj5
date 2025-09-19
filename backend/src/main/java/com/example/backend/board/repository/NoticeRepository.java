package com.example.backend.board.repository;

import com.example.backend.board.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
}