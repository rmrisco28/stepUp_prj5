USE prj5;

CREATE TABLE `extra_curricular_program`
(
    program_seq      INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title            VARCHAR(100)                   NOT NULL,
    content          VARCHAR(4000)                  NOT NULL,
    author           VARCHAR(100)                   NOT NULL,
    operate_start_dt DATETIME                       NOT NULL,
    operate_end_dt   DATETIME                       NOT NULL,
    apply_start_dt   DATETIME                       NOT NULL,
    apply_end_dt     DATETIME                       NOT NULL,
    location         VARCHAR(250)                   NULL,
    competency       INT                            NOT NULL,
    operation_type   VARCHAR(100)                   NOT NULL,
    grades           VARCHAR(100)                   NULL,
    capacity         INT                            NOT NULL DEFAULT 0,
    applicants       INT                            NOT NULL DEFAULT 0,
    waiting          INT                            NOT NULL DEFAULT 0,
    status           VARCHAR(100)                   NOT NULL DEFAULT 'DRAFT',
    manager          VARCHAR(100)                   NULL,
    manager_phone    VARCHAR(100)                   NULL,
    mileage_points   INT                            NULL     DEFAULT 0,
    view             INT                            NULL     DEFAULT 0,
    created_at       DATETIME                       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SHOW CREATE TABLE extra_curricular_program;

ALTER TABLE extra_curricular_program
    DROP COLUMN use_yn;


DROP TABLE extra_curricular_program;

CREATE TABLE `extra_curricular_image_thumb`
(
    program_seq INT NOT NULL,
    name        VARCHAR(100),
    PRIMARY KEY (program_seq, name),
    FOREIGN KEY (program_seq) REFERENCES extra_curricular_program (program_seq) ON DELETE CASCADE
);

DROP TABLE extra_curricular_image_thumb;


CREATE TABLE `extra_curricular_image_content`
(
    program_seq INT NOT NULL,
    name        VARCHAR(100),
    PRIMARY KEY (program_seq, name),
    FOREIGN KEY (program_seq) REFERENCES extra_curricular_program (program_seq) ON DELETE CASCADE
);

DROP TABLE extra_curricular_image_content;

SHOW CREATE TABLE extra_curricular_image_thumb;
SHOW CREATE TABLE extra_curricular_image_content;

CREATE TABLE `extra_curricular_application`
(
    application_seq INT AUTO_INCREMENT PRIMARY KEY,     -- 기본키
    program_seq     INT NOT NULL,                       -- 신청 프로그램
    member_seq      INT NOT NULL,                       -- 신청한 회원
    apply_dt        DATETIME DEFAULT CURRENT_TIMESTAMP, -- 신청 일시, 기본값 현재 시간
    status          VARCHAR(100),                       -- 신청 상태
    motive          VARCHAR(500),                       -- 신청 동기
    CONSTRAINT `fk_program` FOREIGN KEY (`program_seq`) REFERENCES `extra_curricular_program` (`program_seq`) ON DELETE CASCADE,
    CONSTRAINT `fk_member` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`) ON DELETE CASCADE
);

DROP TABLE extra_curricular_application;
SHOW CREATE TABLE extra_curricular_application;

CREATE TABLE faq
(
    faq_seq     INT AUTO_INCREMENT PRIMARY KEY,
    question    VARCHAR(255)  NOT NULL,
    answer      VARCHAR(1000) NOT NULL,
    inserted_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE faq;

CREATE TABLE extra_curricular_complete
(
    complete_seq    INT AUTO_INCREMENT PRIMARY KEY,
    program_seq     INT    NOT NULL,
    application_seq INT    NOT NULL,
    member_seq      INT    NOT NULL,
    complete_status INT(1) NOT NULL DEFAULT 0 COMMENT '0=미신청, 1=신청',
    FOREIGN KEY (program_seq) REFERENCES extra_curricular_program (program_seq) ON DELETE CASCADE,
    FOREIGN KEY (application_seq) REFERENCES extra_curricular_application (application_seq) ON DELETE CASCADE,
    FOREIGN KEY (member_seq) REFERENCES member (member_seq) ON DELETE CASCADE
);

DROP TABLE extra_curricular_complete;
