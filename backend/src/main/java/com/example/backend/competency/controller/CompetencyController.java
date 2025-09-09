package com.example.backend.competency.controller;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.entity.Competency;
import com.example.backend.competency.service.CompetencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/competency")
public class CompetencyController {
    private final CompetencyService competencyService;

    @PostMapping("add")
    @ResponseBody
    public String add(@RequestBody CompetencyDto dto) {
        competencyService.add(dto);
        System.out.println("dto = " + dto);
        return null;

    }


}
