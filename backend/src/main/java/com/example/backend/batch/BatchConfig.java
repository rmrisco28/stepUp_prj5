package com.example.backend.batch;

import com.example.backend.batch.student.dto.StudentCsvDto;
import com.example.backend.batch.student.entity.Student;
import com.example.backend.batch.student.processor.StudentItemProcessor;
import com.example.backend.batch.student.processor.StudentSaveMemberItemProcessor;
import com.example.backend.batch.student.repository.StudentRepository;
import com.example.backend.member.dto.MemberSaveDto;
import com.example.backend.member.entity.Member;
import com.opencsv.bean.CsvToBeanBuilder;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.io.FileReader;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class BatchConfig {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final DataSource dataSource; // jdbc로 db 접속하기 때문에 db 연결정보를 위해 필요함
    private final StudentRepository studentRepository;
    private final StudentItemProcessor studentItemProcessor;
    private final StudentSaveMemberItemProcessor studentSaveMemberItemProcessor;

    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public Job studentImportJob() {
        return new JobBuilder("studentImportJob", jobRepository)
                .start(studentImportStep()) // Step 1 : csv -> student (csv 파일 읽어서 학번 생성 후 student table에 저장)
                .next(studentSaveMemberStep()) // Step 2 : student -> member (student table의 학번과 생년월일(초기 비밀번호) 읽어서 가공 후 member table에 저장)
                .next(memberSeqSaveStudentStep()) // Step 3 :  member -> student (member의 member_seq를 student 의 member_seq 컬럼에 추가 : 학번 같은 거 확인하는 로직)
                .build();
    }

    @Bean
    public Step studentImportStep() {
        return new StepBuilder("studentImportStep", jobRepository)
                .<List<StudentCsvDto>, List<Student>>chunk(1, transactionManager) // 학번 생성은 로직이 복잡해서 전체 데이터 읽어서 한번에 가져옴
                .reader(studentCsvReader())
                .processor(studentListProcessor())
                .writer(studentListWriter())
                .build();
    }

    @Bean
    public Step studentSaveMemberStep() {
        return new StepBuilder("studentSaveMemberStep", jobRepository)
                .<MemberSaveDto, Member>chunk(10, transactionManager)
                .reader(studentDbReader())
                .processor(studentSaveMemberProcessor())
                .writer(studentMemberDbWriter())
                .build();
    }

    @Bean
    public Step memberSeqSaveStudentStep() {
        return new StepBuilder("memberSeqSaveStudentStep", jobRepository)
                .<Student, Student>chunk(10, transactionManager) // chunk 단위 처리
                .reader(memberSeqReader())
                .writer(memberSeqWriter())
                .build();
    }


    // Step 1 reader - processor - writer

    @Bean
    public ItemReader<List<StudentCsvDto>> studentCsvReader() {
        return new ItemReader<List<StudentCsvDto>>() {
            private boolean read = false;

            @Override
            public List<StudentCsvDto> read() throws Exception {
                if (!read) {
                    read = true;

                    // CSV 파일 경로 - src/main/resources/students.csv
                    ClassPathResource resource = new ClassPathResource("students.csv");

                    log.info("Reading CSV file: {}", resource.getFilename());

                    // CSVToBeanBuilder를 사용해 CSV 파일을 DTO 리스트로 파싱
                    List<StudentCsvDto> students = new CsvToBeanBuilder<StudentCsvDto>(
                            new FileReader(resource.getFile()))
                            .withType(StudentCsvDto.class)
                            .withIgnoreLeadingWhiteSpace(true)
                            .withSkipLines(1) // 헤더 스킵(첫줄 스킵)
                            .build()
                            .parse();

                    log.info("Total students read from CSV: {}", students.size());
                    return students;
                }
                return null; // 한 번만 읽음 -> 청크에서 1 해서 어차피 한번만 읽긴 함.
            }
        };
    }

    @Bean
    public ItemProcessor<List<StudentCsvDto>, List<Student>> studentListProcessor() {
        // ItemProcessor<Input, Output>
        // 데이터 가공 (상세 과정은 stdentItemProcessor -> StudentNumberGenerator)
        // ItemReader에서 읽은 List<StudentCsvDto>를 비즈니스 로직을 통해 List<Student>로 변환
        return studentItemProcessor::process;
    }

    @Bean
    public ItemWriter<List<Student>> studentListWriter() {
        return new ItemWriter<List<Student>>() {
            @Override
            public void write(Chunk<? extends List<Student>> chunk) throws Exception {
                // chunk.getItems()는 List<List<Student>> 형태이지만, 현재 ItemReader가 한 번에 전체 리스트를 반환하므로, 리스트는 단 하나의 아이템(전체 학생 목록)만 가짐
                List<Student> studentList = chunk.getItems().get(0);
                // TODO 유민 : 중복 체크 processor 에서 처리되도록 하기
                // 중복 학번 체크 후 새로운 학생만 저장
                List<Student> newStudents = studentList.stream()
                        .filter(student -> {
                            if (!studentRepository.existsByStudentNo(student.getStudentNo())) {
                                return true; // 저장할 학생
                            } else {
                                log.info("Student already exists, skipping: {}", student.getStudentNo());
                                return false; // 스킵할 학생
                            }
                        })
                        .collect(Collectors.toList());

                studentRepository.saveAll(newStudents);
                log.info("Saved {} new students to database", newStudents.size());
            }
        };
    }

    // Step 2 Reader - processor - writer

    @Bean
    public JdbcCursorItemReader<MemberSaveDto> studentDbReader() {
        return new JdbcCursorItemReaderBuilder<MemberSaveDto>()
                .name("studentDbReader")
                .dataSource(dataSource)
                .sql("SELECT student_no as loginId, birth_date as rawPassword FROM student ORDER BY student_seq")
                .rowMapper(new BeanPropertyRowMapper<>(MemberSaveDto.class))
                .build();
    }

    @Bean
    public ItemProcessor<MemberSaveDto, Member> studentSaveMemberProcessor() {
        // ItemProcessor<Input, Output>
        // 데이터 가공 (상세 과정은 studentSaveMemberItemProcessor -> StudentNumberGenerator)
        return studentSaveMemberItemProcessor::process;
    }

    @Bean
    public JpaItemWriter<Member> studentMemberDbWriter() {
        // JpaItemWriter는 데이터를 JPA를 통해 DB에 저장하는 Writer
        JpaItemWriter<Member> writer = new JpaItemWriter<>();
        writer.setEntityManagerFactory(entityManagerFactory);
        return writer;
    }

    // Step 3 Reader - (processor, 생략) - writer
    @Bean
    public JdbcCursorItemReader<Student> memberSeqReader() {
        JdbcCursorItemReader<Student> reader = new JdbcCursorItemReader<>();
        reader.setDataSource(dataSource);
        reader.setRowMapper((rs, rowNum) -> {
            Student student = new Student();
            student.setId(rs.getInt("id")); // student PK
            student.setStudentNo(rs.getString("student_no"));
            student.setMemberSeq(rs.getInt("member_seq")); // member PK

            log.info("Reader Row {}: studentNo={}, memberSeq={}", rowNum, student.getStudentNo(), student.getMemberSeq());

            return student;
        });

        String sql = """
                SELECT s.student_seq AS id, s.student_no, m.member_seq AS member_seq
                FROM student s
                JOIN member m ON s.student_no = m.login_id
                WHERE s.member_seq IS NULL
                """;

        reader.setSql(sql);
        return reader;
    }

    @Bean
    public JdbcBatchItemWriter<Student> memberSeqWriter() {
        JdbcBatchItemWriter<Student> writer = new JdbcBatchItemWriter<>();
        writer.setDataSource(dataSource);
        writer.setSql("UPDATE student SET member_seq = :memberSeq WHERE student_seq = :id");
        writer.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>());
        return writer;
    }

}