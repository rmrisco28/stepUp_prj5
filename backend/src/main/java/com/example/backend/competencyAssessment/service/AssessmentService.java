package com.example.backend.competencyAssessment.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.entity.SubCompetency;
import com.example.backend.competency.repository.CompetencyRepository;
import com.example.backend.competency.repository.SubCompetencyRepository;
import com.example.backend.competencyAssessment.dto.*;
import com.example.backend.competency.dto.MainCompetencyDto;
import com.example.backend.competencyAssessment.entity.Assessment;
import com.example.backend.competencyAssessment.entity.Choice;
import com.example.backend.competencyAssessment.entity.Question;
import com.example.backend.competencyAssessment.repository.AssessmentRepository;
import com.example.backend.competencyAssessment.repository.ChoiceRepository;
import com.example.backend.competencyAssessment.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentService {
    private final AssessmentRepository assessmentRepository;
    private final CompetencyRepository competencyRepository;
    private final SubCompetencyRepository subCompetencyRepository;
    private final QuestionRepository questionRepository;
    private final ChoiceRepository choiceRepository;

    /*----------------- 역량 진단 목록 ----------------*/

    // 진단 목록 추가
    public ResponseEntity<?> add(AssessmentDto dto) {
        if (dto.getStartDttm().isAfter(dto.getEndDttm())) {
            return ResponseEntity.badRequest().body(Map.of("error", "시작일은 종료일보다 늦을 수 없습니다."));
        }
        Assessment assessment = new Assessment();
        assessment.setCaTitle(dto.getCaTitle());
        assessment.setStartDttm(dto.getStartDttm());
        assessment.setEndDttm(dto.getEndDttm());

        assessmentRepository.save(assessment);
        return ResponseEntity.ok().body(Map.of("message", "진단 목록이 생성되었습니다."));
    }

    public Map<String, Object> list(Integer pageNumber) {
        Page<AssessmentDto> assessmentDtoPage = assessmentRepository.findAllBy(PageRequest.of(pageNumber - 1, 5));

        int totalPages = assessmentDtoPage.getTotalPages(); // 마지막 페이지
        int rightPageNumber = ((pageNumber - 1) / 5 + 1) * 5;
        int leftPageNumber = rightPageNumber - 4;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);

        var pageInfo = Map.of("totalPages", totalPages, "rightPageNumber", rightPageNumber, "leftPageNumber", leftPageNumber, "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "assessmentList", assessmentDtoPage.getContent());
    }

/*
        public ResponseEntity<?> delete(int seq) {
        Assessment assessment = assessmentRepository.findBySeq(seq);

        System.out.println("assessment = " + assessment);
        assessmentRepository.delete(assessment);
        return ResponseEntity.ok().body(Map.of("message", "역량 진단 목록이 삭제되었습니다."));
    }
    */


    /*~~~~~~~~~~~~~~~~~~~~~~~ 목록 세부 관리 ~~~~~~~~~~~~~~~~~~~~~~~*/

    // 진단 목록 제목 전달
    public List<?> title(int seq) {
        List<AssessmentTitleDto> assessmentTitleDtos = assessmentRepository.findAssessmentBySeq(seq);
        return assessmentTitleDtos;
    }

    // 진단 목록 문항 전달
    public Map<String, Object> questionList(int seq, Integer pageNumber) {
//        List<QuestionListDto> questionList = questionRepository.findByCaSeqSeq(seq);

        Pageable pageable = PageRequest.of(pageNumber - 1, 20);  // 한 페이지당 20개의 문항
        Page<QuestionListDto> questionListPage = questionRepository.findByCaSeqSeq(seq, pageable);
        int totalPages = questionListPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 20 + 1) * 20;
        int leftPageNumber = rightPageNumber - 19;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);

        Map<String, Object> pageInfo = Map.of(
                "totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber
        );
        return Map.of(
                "pageInfo", pageInfo,
                "questionList", questionListPage.getContent()  // 페이지에 맞게 데이터만 가져옵니다.
        );
    }

    // 진단 목록 수정 데이터 수정
    public ResponseEntity<?> update(int seq, AssessmentDto dto) {
        Assessment assessment = assessmentRepository.findEntityBySeq(seq);
        if (assessment == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "잘못된 값입니다."));
        }
        assessment.setCaTitle(dto.getCaTitle());
        assessment.setStartDttm(dto.getStartDttm());
        assessment.setEndDttm(dto.getEndDttm());

        assessmentRepository.save(assessment);

        return ResponseEntity.ok().body(Map.of("message", "수정이 완료되었습니다."));
    }


    /*------------------- 문제 추가 ------------------*/

    public List<?> competencyList() {
        List<CompetencyDto> competencyDtos = competencyRepository.findAllCompetenciesUse();
        return competencyDtos;
    }

    // 역량진단 목록 관리
    public List<?> subCompetencyList() {
        List<MainCompetencyDto> subCompetencyDtos = subCompetencyRepository.findAllSubCompetenciesUse();
        return subCompetencyDtos;
    }

    // 진단목록 수정 데이터 조회
    public ResponseEntity<?> edit(int seq) {
        AssessmentDto assessmentDto = assessmentRepository.findBySeq(seq);
        return ResponseEntity.ok().body(assessmentDto);
    }


    public ResponseEntity<?> questionAdd(int seq, QuestionAddDto dto) {
        if (questionRepository.findByQuestionNum(dto.getQuestionNum()) != null) {
            return ResponseEntity.badRequest().body(Map.of("message", "문항번호가 중복되어 저장에 실패하였습니다."));
        }
        Question question = new Question();

        Assessment assessment = assessmentRepository.findEntityBySeq(seq);
        SubCompetency subCompetency = subCompetencyRepository.findBySeq(dto.getSubCompetencySeqSeq());

        question.setSeq(dto.getSeq());
        question.setCaSeq(assessment);
        question.setSubCompetencySeq(subCompetency);


        question.setQuestionNum(dto.getQuestionNum());
        question.setQuestion(dto.getQuestion());
        question.setScore(dto.getScore());
        questionRepository.save(question);

        return ResponseEntity.ok().body(Map.of("question", question));
    }

    public ResponseEntity<?> choiceAdd(int seq, ChoiceAddDto dto) {
        Choice choice = new Choice();

        Question question = questionRepository.findBySeq(dto.getQuestionSeqSeq());

        choice.setQuestionSeq(question);
        choice.setOption(dto.getOption());
        choice.setPoint(dto.getPoint());

        choiceRepository.save(choice);

        return ResponseEntity.ok().body(Map.of("message", "답안저장이 완료되었습니다."));

    }

    public QuestionListDto questionDetail(int seq, int num) {
        QuestionListDto questionDetail = questionRepository.findByQuestionNum(seq, num);
        return questionDetail;
    }


    // 진단 목록 세부 관리
//    public List<?> adminList(int seq) {
//        List<QuestionDto> questionDtos = questionRepository.findByCaSeqSeq(seq);
//        return questionDtos;
//    }
}
