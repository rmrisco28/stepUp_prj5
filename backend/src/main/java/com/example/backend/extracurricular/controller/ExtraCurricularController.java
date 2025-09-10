package com.example.backend.extracurricular.controller;

import com.example.backend.extracurricular.service.ExtraCurricularService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/extracurricular")
@RequiredArgsConstructor
public class ExtraCurricularController {

    private final ExtraCurricularService extraCurricularService;
}
