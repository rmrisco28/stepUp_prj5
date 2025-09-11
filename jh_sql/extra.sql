USE prj5;

CREATE TABLE `extra_curricular_program`
(
    program_seq      INT AUTO_INCREMENT PRIMARY KEY       NOT NULL,
    title            VARCHAR(100)                         NOT NULL,
    content          VARCHAR(4000)                        NOT NULL,
    author           INT                                  NOT NULL,
    operate_start_dt DATETIME                             NOT NULL,
    operate_end_dt   DATETIME                             NOT NULL,
    apply_start_dt   DATETIME                             NOT NULL,
    apply_end_dt     DATETIME                             NOT NULL,
    location         VARCHAR(250)                         NULL,
    competency       VARCHAR(100)                         NOT NULL,
    operation_type   ENUM ('OFFLINE', 'ONLINE', 'HYBRID') NOT NULL,
    grades           VARCHAR(100)                         NULL,
    capacity         INT                                  NOT NULL DEFAULT 0,
    applicants       INT                                  NOT NULL DEFAULT 0,
    waiting          INT                                  NOT NULL DEFAULT 0,
    status           VARCHAR(100)                         NOT NULL,
    manager          VARCHAR(100)                         NULL,
    manager_phone    VARCHAR(100)                         NULL,
    mileage_points   INT                                  NULL     DEFAULT 0,
    view             INT                                  NULL     DEFAULT 0,
    created_at       TIMESTAMP                            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP                            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE extra_curricular_program;
