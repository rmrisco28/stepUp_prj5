package com.example.backend.competencyAssessment.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.entity.SubCompetency;
import com.example.backend.competency.repository.CompetencyRepository;
import com.example.backend.competency.repository.SubCompetencyRepository;
import com.example.backend.competencyAssessment.dto.*;
import com.example.backend.competency.dto.MainCompetencyDto;
import com.example.backend.competencyAssessment.entity.*;
import com.example.backend.competencyAssessment.repository.*;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentService {
    private final AssessmentRepository assessmentRepository;
    private final CompetencyRepository competencyRepository;
    private final SubCompetencyRepository subCompetencyRepository;
    private final QuestionRepository questionRepository;
    private final ChoiceRepository choiceRepository;
    private final ResponseRepository responseRepository;
    private final CompleteRepository completeRepository;
    private final MemberRepository memberRepository;
    private final ResourceLoader resourceLoader;
    private final ResultRepository resultRepository;

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

    // 총점 보내기
    public Object totalScore(int seq) {
        List<Question> questions = questionRepository.findAllByCaSeqSeq(seq);
        return questions;
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

    // 진단 문제 저장
    public ResponseEntity<?> questionAdd(int seq, QuestionAddDto dto) {
        if (questionRepository.existsByCaSeq_SeqAndQuestionNum(dto.getCaSeqSeq(), dto.getQuestionNum())) {
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

        return ResponseEntity.ok().body(Map.of("question", question, "message", "질문저장이 완료되었습니다."));
    }

    // 진단 선택지 저장
    public ResponseEntity<?> choiceAdd(int seq, ChoiceAddDto dto) {
        Choice choice = new Choice();

        Question question = questionRepository.findBySeq(dto.getQuestionSeqSeq());

        choice.setQuestionSeq(question);
        choice.setOrder(dto.getOrder());
        choice.setOption(dto.getOption());
        choice.setPoint(dto.getPoint());

        choiceRepository.save(choice);

        return ResponseEntity.ok().body(Map.of("message", "답안저장이 완료되었습니다."));

    }

    // 문제 수정을 위한 문제 데이터 전달
    public QuestionListDto questionDetail(int seq, int num) {
        QuestionListDto questionDetail = questionRepository.findByQuestionNum(seq, num);
        return questionDetail;
    }
    // 선택지 수정을 위한 선택지 데이터 전달

    public List<?> choiceDetail(int seq, int num) {
        List<ChoiceListDto> choiceListDto = choiceRepository.findByQuestionSeqNum(seq, num);
        return choiceListDto;
    }

    // 문제 업데이트
    public ResponseEntity<?> questionUpdate(int seq, int num, QuestionAddDto dto) {
        Question question = questionRepository.findByCaSeqSeqAndQuestionNum(seq, num);
        if (question == null) {
            throw new EntityNotFoundException("문항번호를 찾을 수 없습니다.");
        }
        SubCompetency subCompetency = subCompetencyRepository.findBySeq(dto.getSubCompetencySeqSeq());
        question.setSubCompetencySeq(subCompetency);
        question.setQuestionNum(dto.getQuestionNum());
        question.setQuestion(dto.getQuestion());
        question.setScore(dto.getScore());
        questionRepository.save(question);
        return ResponseEntity.ok().body(Map.of("message", "문제 수정이 완료되었습니다."));

    }

    // 선택지 업데이트
    public ResponseEntity<?> choiceUpdate(int num, ChoiceListDto dto) {
        System.out.println("num = " + num);
        System.out.println("dto = " + dto);
        System.out.println("num = " + num);
        if (dto.getSeq() == null) {
            Question newQuestion = questionRepository.findBySeq(dto.getQuestionSeqSeq());
            System.out.println("newQuestion = " + newQuestion);
            if (newQuestion == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "해당 문제를 찾을 수 없습니다."));
            }

            Choice newChoice = new Choice();
            newChoice.setQuestionSeq(newQuestion);
            newChoice.setOrder(dto.getOrder());
            newChoice.setOption(dto.getOption());
            newChoice.setPoint(dto.getPoint());
            choiceRepository.save(newChoice);
        }

        // 기존 선택지 업데이트
        Choice choice = choiceRepository.findBySeq(dto.getSeq());
        if (choice == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "해당 선택지를 찾을 수 없습니다."));
        }
        choice.setOrder(dto.getOrder());
        choice.setOption(dto.getOption());
        choice.setPoint(dto.getPoint());
        choiceRepository.save(choice);

        return ResponseEntity.ok().body(Map.of("message", "선택지 수정이 완료되었습니다."));
    }

    public ResponseEntity<?> choiceDelete(int choiceSeq) {
        try {
            Choice choice = choiceRepository.findBySeq(choiceSeq);
            if (choice == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "해당 선택지를 찾을 수 없습니다."));
            }

            choiceRepository.delete(choice);
            return ResponseEntity.ok().body(Map.of("message", "선택지가 삭제되었습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "선택지 삭제 중 오류가 발생했습니다."));
        }
    }

    /* --------------------- 테스트 ----------------------- */

    public AssessmentDto testReady(int seq) {
        AssessmentDto assessmentDto = assessmentRepository.findBySeq(seq);
        return assessmentDto;
    }


    // 진단여부 확인
    public ResponseEntity<Boolean> testCheck(int seq, int memberSeq) {
        Boolean check = completeRepository.existsByMemberSeq_IdAndCaSeq_Seq(memberSeq, seq);
        System.out.println("check = " + check);
        return ResponseEntity.ok(check);
    }

    public List<?> choiceList(int seq) {
        List<ChoiceListDto> choiceListDto = choiceRepository.findByQuestionSeqCaSeqSeq(seq);
        return choiceListDto;
    }

    // 응답 저장
    public ResponseEntity<?> responseSave(int seq, List<ResponseDto> dtoList) {
        List<Response> savedList = new ArrayList<>();

        dtoList.forEach(dto -> {
            if (dto.getSeq() == null) {
                Response response = new Response();

                Optional<Member> member = memberRepository.findById(dto.getMemberSeq());
                Question question = questionRepository.findBySeq(dto.getQuestionSeqSeq());
                Choice choice = choiceRepository.findBySeq(dto.getChoiceSeqSeq());

                if (member.isPresent()) {
                    response.setMemberSeq(member.get());
                } else {
                    return;
                }
                response.setQuestionSeq(question);
                response.setChoiceSeq(choice);

                savedList.add(responseRepository.save(response));
            } else {
                Optional<Response> existingResponse = responseRepository.findById(dto.getSeq());
                if (existingResponse.isPresent()) {
                    Response response = existingResponse.get();

                    // 기존 응답 수정
                    Question question = questionRepository.findBySeq(dto.getQuestionSeqSeq());
                    if (question != null) {
                        response.setQuestionSeq(question);
                    }

                    Choice choice = choiceRepository.findBySeq(dto.getChoiceSeqSeq());
                    if (choice != null) {
                        response.setChoiceSeq(choice);
                    }

                    // 기존 응답 저장 (업데이트)
                    savedList.add(responseRepository.save(response));
                }

            }

        });
        List<Map<String, Object>> result = savedList.stream()
                .map(r -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("responseSeq", r.getSeq());
                    m.put("questionSeq", r.getQuestionSeq().getSeq());
                    return m;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);

    }

    public ResponseEntity<?> complete(int seq, CompleteSaveDto dto) {
        Complete complete = new Complete();
        Assessment assessment = assessmentRepository.findAllBySeq(seq);

        Optional<Member> member = memberRepository.findById(dto.getMemberSeq());

        if (member.isPresent()) {
            complete.setMemberSeq(member.get());
        } else {
            return ResponseEntity.badRequest().body("잘못된 저장입니다.");
        }

        complete.setCaSeq(assessment);

        completeRepository.save(complete);
        return ResponseEntity.ok().build();
    }


    public ResponseEntity<?> resultSave(int seq, List<ResponseDto> dtoList) {
        // 배열 수 만큼 반복시킨다.
        List<Result> savedList = new ArrayList<>();

        dtoList.forEach(dto -> {

            Result result = new Result();
            // 사용자 ID 저장
            Member member = memberRepository.findById(dto.getMemberSeq()).get();
            result.setMemberSeq(member);

            // 역량 저장
            Question question = questionRepository.findBySeq(dto.getQuestionSeqSeq());
            result.setSubCompetencySeq(question.getSubCompetencySeq());

            // 역량 진단 제목 저장
            Assessment assessment = assessmentRepository.findAllBySeq(seq);
            result.setCaSeq(assessment);

            //점수 저장
            Choice choice = choiceRepository.findBySeq(dto.getChoiceSeqSeq());
            result.setScore(choice.getPoint());

            savedList.add(resultRepository.save(result));
        });
        return ResponseEntity.ok(savedList);
    }

    public List<?> result(int seq, int memberSeq) {
        List<ResultDto> resultDto = resultRepository.findBySeq(seq, memberSeq);
        System.out.println("resultDto = " + resultDto);
        return resultDto;
    }

    public List<QuestionListDto> resultQuestionList(int seq) {
        List<QuestionListDto> resultQuestionList = questionRepository.findByCaSeqSeq(seq);
        return resultQuestionList;
    }
}
