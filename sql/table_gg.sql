# 핵심역량 테이블
CREATE TABLE `competency`
(
    `competency_seq`   INT AUTO_INCREMENT NOT NULL,
    `competency_name`  VARCHAR(50)        NOT NULL,
    `competency_expln` VARCHAR(500)       NULL,
    use_yn             BOOLEAN            NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_competency PRIMARY KEY (competency_seq)
);

DROP TABLE IF EXISTS `competency`;

# 하위역량 테이블
DROP TABLE IF EXISTS `subCompetency`;
DROP TABLE IF EXISTS `sub_competency`;

CREATE TABLE `sub_competency`
(
    `sub_competency_seq`   INT AUTO_INCREMENT NOT NULL,
    `competency_seq`       INT                NOT NULL,
    `sub_competency_name`  VARCHAR(50)        NOT NULL,
    `sub_competency_expln` VARCHAR(5000)      NULL,
    `use_Yn`               BOOLEAN            NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_subCompetency PRIMARY KEY (sub_competency_seq),
    FOREIGN KEY (competency_seq) REFERENCES competency (competency_seq)

);


# 데이터베이스 문자셋 확인
SHOW VARIABLES LIKE 'character_set%';
# 데이터 베이스 문자열 규칙 변경
ALTER DATABASE prj5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
# 데이터 베이스 문자셋 규칙 변경
ALTER TABLE sub_competency
    CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
# sub_competency 테이블 문자열 규칙 변경
ALTER TABLE sub_competency
    MODIFY COLUMN sub_competency_expln VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
# subCompetency 테이블 컬럼 정보 확인
SHOW FULL COLUMNS FROM sub_competency;


# 역량 진단 목록
CREATE TABLE `assessment`
(
    `ca_seq`      INT AUTO_INCREMENT NOT NULL,
    `ca_title`    VARCHAR(50)        NOT NULL,
    `create_dttm` DATETIME           NOT NULL DEFAULT NOW(),
    `start_dttm`  DATETIME           NOT NULL,
    `end_dttm`    DATETIME           NOT NULL,
    `use_Yn`      BOOLEAN            NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_competency_assessment PRIMARY KEY (ca_seq)
);

drop table assessment;


# 문항 목록
CREATE TABLE `question`
(
    `question_seq`       INT AUTO_INCREMENT NOT NULL,
    `ca_seq`             INT                NOT NULL COMMENT '역량 진단 제목',
    `sub_competency_seq` INT                NOT NULL,
    `question_num`       INT                NOT NULL COMMENT 'UK',
    `question`           VARCHAR(200)       NOT NULL,
    `score`              DECIMAL(10, 2)     NOT NULL,
    CONSTRAINT pk_question PRIMARY KEY (question_seq),
    CONSTRAINT uq_question UNIQUE (ca_seq, question_num),
    FOREIGN KEY (ca_seq) REFERENCES assessment (ca_seq),
    FOREIGN KEY (sub_competency_seq) REFERENCES sub_competency (sub_competency_seq)
);

DROP TABLE question;

SHOW CREATE TABLE question;

# 질문 항목 만들고 꼭 실행필요
ALTER TABLE `question`
    DROP INDEX `UKnoqgq4420j090q7usyugfk56n`;


# 선택지 목록
CREATE TABLE `choice`
(
    `choice_seq`   INT AUTO_INCREMENT NOT NULL,
    `question_seq` INT                NOT NULL,
    `order`        INT                NOT NULL,
    `option`       VARCHAR(50)        NOT NULL,
    `point`        DECIMAL(10, 2)     NOT NULL,
    CONSTRAINT pk_choice PRIMARY KEY (choice_seq),
    FOREIGN KEY (question_seq) REFERENCES question (question_seq)
);

DROP TABLE choice;

# 응답 테이블
CREATE TABLE `response`
(
    `response_seq` INT AUTO_INCREMENT NOT NULL,
    `student_seq`  INT                NOT NULL,
    `question_seq` INT                NOT NULL,
    `choice_seq`   INT                NOT NULL,
    CONSTRAINT pk_response primary key (response_seq),
    FOREIGN KEY (student_seq) REFERENCES student (student_seq),
    FOREIGN KEY (question_seq) REFERENCES question (question_seq),
    FOREIGN KEY (choice_seq) REFERENCES choice (choice_seq)
);

DROP TABLE IF EXISTS `response`;

# 결과 테이블
CREATE TABLE `complete`
(
    `result_seq`     INT AUTO_INCREMENT NOT NULL,
    `student_seq`    INT                NOT NULL COMMENT '회원 ID',
    `ca_seq`         INT                NOT NULL COMMENT '역량 진단 제목',
    `assessmentDttm` DateTime           NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_result PRIMARY KEY (result_seq),
    FOREIGN KEY (student_seq) REFERENCES student (student_seq),
    FOREIGN KEY (ca_seq) REFERENCES assessment (ca_seq)
);

DROP TABLE IF EXISTS `complete`;


# 상세결과 테이블
DROP TABLE IF EXISTS `result_detail`;

CREATE TABLE `result_detail`
(
    `result_detail_seq`  INT AUTO_INCREMENT NOT NULL,
    `result_seq`         INT                NOT NULL, # 학생 정보 가져오기
    `sub_competency_seq` INT                NOT NULL COMMENT '역량',
    `ca_seq`             INT                NOT NULL COMMENT '역량 진단 제목',
    `score`              VARCHAR            NOT NULL,
    CONSTRAINT pk_result_detail PRIMARY KEY (result_detail_seq),
    FOREIGN KEY (result_seq) REFERENCES result (result_seq),
    FOREIGN KEY (sub_competency_seq) REFERENCES sub_competency (sub_competency_seq),
    FOREIGN KEY (ca_seq) REFERENCES assessment (ca_seq)
);



