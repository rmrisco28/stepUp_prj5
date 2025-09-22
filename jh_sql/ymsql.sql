use prj5;

SHOW CREATE TABLE extra_curricular_program;
# 잘못된 참조 관계 삭제
ALTER TABLE extra_curricular_program
    DROP FOREIGN KEY extra_curricular_program_ibfk_1;
# competency 참조하도록 바꿈
ALTER TABLE extra_curricular_program
    ADD CONSTRAINT fk_program_competency
        FOREIGN KEY (competency)
            REFERENCES competency (competency_seq);