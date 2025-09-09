package com.example.backend.competency.controller;

import com.example.backend.competency.service.CompetencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/competency")
public class CompetencyController {
    private final CompetencyService competencyService;

    @GetMapping("competency")
    public String getCompetency() {
        competencyService.list();
        return "competency";
    }


}
