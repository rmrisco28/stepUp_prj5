use prj5;

SHOW CREATE TABLE extra_curricular_program;
SHOW CREATE TABLE extra_curricular_application;
# 잘못된 참조 관계 삭제
ALTER TABLE extra_curricular_program
    DROP FOREIGN KEY fk_program_competency;
ALTER TABLE extra_curricular_program
    DROP COLUMN competency;
ALTER TABLE extra_curricular_program
    ADD COLUMN competency INT(10) NOT NULL;
# competency 참조하도록 바꿈
ALTER TABLE extra_curricular_program
    ADD CONSTRAINT fk_program_competency
        FOREIGN KEY (competency)
            REFERENCES sub_competency (sub_competency_seq);
SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;

# 신청 상태 변경
ALTER TABLE extra_curricular_application
    MODIFY COLUMN status INT(1) NOT NULL DEFAULT 1 COMMENT '0=미신청, 1=신청';

# dev check 주석