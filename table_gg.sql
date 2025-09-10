# 역량 테이블
CREATE TABLE `competency`
(
    `competency_seq`   INT AUTO_INCREMENT NOT NULL,
    `competency_name`  VARCHAR(50)        NOT NULL,
    `competency_expln` VARCHAR(500)       NULL,
    use_yn             BOOLEAN            NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_competency PRIMARY KEY (competency_seq)
);

DROP TABLE IF EXISTS `competency`;

# 하위 역량 테이블
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

ALTER TABLE `subCompetency`
    ADD CONSTRAINT `PK_SUBCOMPETENCY` PRIMARY KEY (
                                                   `sub_competency_seq`
        );

SHOW CREATE TABLE prj5.subCompetency;
SHOW CREATE TABLE subCompetency;




