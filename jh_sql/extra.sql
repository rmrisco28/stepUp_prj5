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
    competency       VARCHAR(100)                   NOT NULL,
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
    updated_at       DATETIME                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    use_yn           BOOLEAN                        NOT NULL DEFAULT TRUE
);

DROP TABLE extra_curricular_program;

CREATE TABLE `extra_curricular_image_thumb`
(
    program_seq INT          NULL,
    name        VARCHAR(100) NULL,
    PRIMARY KEY (program_seq, name),
    FOREIGN KEY (program_seq) REFERENCES extra_curricular_program (program_seq)
);

DROP TABLE extra_curricular_image_thumb;


CREATE TABLE `extra_curricular_image_content`
(
    program_seq INT          NULL,
    name        VARCHAR(100) NULL,
    PRIMARY KEY (program_seq, name),
    FOREIGN KEY (program_seq) REFERENCES extra_curricular_program (program_seq)
);

DROP TABLE extra_curricular_image_content;
