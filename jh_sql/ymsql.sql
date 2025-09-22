use prj5;

SHOW CREATE TABLE extra_curricular_program;
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