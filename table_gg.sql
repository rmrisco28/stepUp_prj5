CREATE TABLE member
(
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    nick_name   VARCHAR(255) NOT NULL UNIQUE,
    info        VARCHAR(255) NULL,
    inserted_at datetime     NOt NULL DEFAULT NOW(),
    CONSTRAINT pk_member PRIMARY KEY (email)
);

# 역량 테이블
CREATE TABLE `competency`
(
    `competency_seq`   INT AUTO_INCREMENT NOT NULL,
    `competency_name`  VARCHAR(50)        NOT NULL,
    `competency_expln` VARCHAR(500)       NULL,
    `competency_img1`  BLOB               NULL,
    `competency_img2`  BLOB               NULL,
    `competency_img3`  BLOB               NULL,
    CONSTRAINT pk_competency PRIMARY KEY (competency_seq)
);

DROP TABLE IF EXISTS `competency`;

# 하위 역량 테이블
CREATE TABLE `subCompetence`
(
    `Key`            INT AUTO_INCREMENT NOT NULL,
    `competency_seq` INT AUTO_INCREMENT NOT NULL,
    `Field`          VARCHAR            NOT NULL,
    `Field2`         VARCHAR(5000)      NULL
);
DROP TABLE IF EXISTS `subCompetence`;


DROP TABLE IF EXISTS `competencyAssessment`;

CREATE TABLE `competencyAssessment`
(
    `ca_seq`      INT         NOT NULL,
    `member_seq`  INT         NOT NULL COMMENT '회원 ID',
    `ca_ttl`      VARCHAR(50) NOT NULL,
    `create_dttm` DateTime    NOT NULL,
    `start_dttm`  DateTime    NULL,
    `end_dttm`    DateTime    NULL,
    CONSTRAINT pk_competency PRIMARY KEY (ca_seq)

);

ALTER TABLE `competencyAssessment`
    ADD CONSTRAINT `PK_COMPETENCYASSESSMENT` PRIMARY KEY (
                                                          `ca_seq`
        );



