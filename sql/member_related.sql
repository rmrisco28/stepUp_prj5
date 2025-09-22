use prj5;

# member
CREATE TABLE member
(
    member_seq INT AUTO_INCREMENT PRIMARY KEY,
    login_id   VARCHAR(20) NOT NULL UNIQUE,
    password   VARCHAR(255)
#     faild_login_cnt INT DEFAULT 0,
#     last_login_at   DATETIME,
    # user_yn CHAR(1)
);
DROP TABLE member;
TRUNCATE TABLE member;
SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;
# 연습용으로 써볼까 근데 그럼 이름이 안 나올건데 그건 뭐 관리자라고 쓰면 되긴 할 듯
INSERT INTO member(login_id, password)
VALUES ('yyy', '1234');
# 비밀번호 암호화 안 해서 그런지 로그인 안 되넹 그냥 관리자도 만들어야지 ..
ALTER TABLE member
    ADD COLUMN user_yn INT NOT NULL DEFAULT 0 COMMENT '0=로그아웃, 1=로그인';

# -----------------------------------------------------------
# student
CREATE TABLE student
(
    student_seq    INT AUTO_INCREMENT PRIMARY KEY,
    student_no     VARCHAR(20) UNIQUE,
    name           VARCHAR(20) NOT NULL,
    gender         VARCHAR(5)  NOT NULL,
    birth_date     DATE        NOT NULL,
    major          VARCHAR(30) NOT NULL,
    admission_year INT         NOT NULL,
    phone          VARCHAR(20) NULL,
    email          VARCHAR(50) NULL
#     member_seq     INT NOT NULL,
#     FOREIGN KEY (member_seq) REFERENCES member (member_seq)
    # use_yn CHAR
);
DROP TABLE student;
TRUNCATE TABLE student;
# -----------------------------------------------------------
# 외래키 제약사항 추가
# -> student, member 만들 때 student에 추가해서 사용하면 됨(위에 주석처리 확인하기)
# 지금은 배치 확인하려고 .. ?
ALTER TABLE student
    ADD member_seq INT,
    ADD CONSTRAINT fk_student_member
        FOREIGN KEY (member_seq)
            REFERENCES member (member_seq);
# 배치 안 쓰고 간단히 sql로 처리하기
UPDATE student
SET member_seq = (SELECT mb.member_seq
                  FROM member mb
                  WHERE mb.login_id = student.student_no)
WHERE student_no IN (SELECT mb.login_id
                     FROM member mb);
# 연습용이라 초기화함
UPDATE student
SET member_seq = NULL;

# -----------------------------------------------------------
# phone, email null -> not null 로 바꾸기, 지금은 확인용으로 가져와보자
# 테이블 가져와서 이름이랑 각 컬럼 상황에 맞게 바꿈
ALTER TABLE prj5.mj_department
    CHANGE COLUMN C1 mj_code INT;
ALTER TABLE prj5.mj_department
    CHANGE COLUMN C2 mj_name VARCHAR(20);
ALTER TABLE prj5.mj_department
    ADD PRIMARY KEY (mj_code);
ALTER TABLE prj5.mj_department
    MODIFY COLUMN mj_name VARCHAR(20) NOT NULL;
ALTER TABLE prj5.mj_department
    MODIFY COLUMN mj_code VARCHAR(5);
# 테이블 상태
create table prj5.mj_department
(
    mj_code varchar(5)  not null
        primary key,
    mj_name varchar(20) not null
);
DROP TABLE mj_department;
RENAME TABLE mjdepartment TO mj_department;

SHOW CREATE TABLE student;
SHOW CREATE TABLE member;

# -----------------------------------------------------------
# employee
CREATE TABLE employee
(
    employee_seq INT AUTO_INCREMENT PRIMARY KEY,
    employee_no  VARCHAR(20) UNIQUE,
    name         VARCHAR(20) NOT NULL,
    gender       VARCHAR(5)  NOT NULL,
    birth_date   DATE        NOT NULL,
    job_function VARCHAR(30) NOT NULL,
    hire_date    DATE        NOT NULL,
    phone        VARCHAR(20) NULL,
    email        VARCHAR(50) NULL,
    member_seq   INT         NULL,
    FOREIGN KEY (member_seq) REFERENCES member (member_seq)
    # use_yn CHAR
);
DROP TABLE employee;
ALTER TABLE employee
    ADD member_seq INT,
    ADD CONSTRAINT fk_employee_member
        FOREIGN KEY (member_seq)
            REFERENCES member (member_seq);

CREATE TABLE jf_department
(
    jf_code VARCHAR(5) PRIMARY KEY,
    jf_name VARCHAR(20)
);
INSERT INTO jf_department
VALUES ('EC', '비교과센터');
INSERT INTO jf_department
VALUES ('CM', '역랑관리센터');


# -----------------------------------------------------------
# administrator
# 흠 관리자 정보도 있어야 하나? 고민 ..
CREATE TABLE administrator
(
    administrator_seq INT AUTO_INCREMENT PRIMARY KEY,
    administrator_no  VARCHAR(20) UNIQUE,
    name              VARCHAR(20) NOT NULL,
    gender            VARCHAR(5)  NOT NULL,
    birth_date        DATE        NOT NULL,
    hire_date         DATE        NOT NULL,
    phone             VARCHAR(20) NULL,
    email             VARCHAR(50) NULL,
    member_seq        INT,
    FOREIGN KEY (member_seq) REFERENCES member (member_seq)
);
# -----------------------------------------------------------
# auth
CREATE TABLE auth
(
    auth_name  VARCHAR(20),
    member_seq INT,
    PRIMARY KEY (auth_name, member_seq),
    FOREIGN KEY (member_seq) REFERENCES member (member_seq) ON DELETE CASCADE
);
DROP TABLE auth;
INSERT INTO auth
VALUES ('extra', 108);
INSERT INTO auth
VALUES ('admin', 107);
INSERT INTO auth
VALUES ('admin', 115);

# 아무것도 안 됨 ;;
SHOW CREATE TABLE member;
SHOW INDEX FROM member;
ALTER TABLE member
    DROP INDEX UKngvxyco6he6s1ikscenee9b99;
ALTER TABLE member
    DROP FOREIGN KEY FKmj5jegh4c3g7n0vj0mryuwv67;
ALTER TABLE member
    DROP COLUMN student_student_seq;

# 전화번호들은 그냥 sql로 추가,

-- 'student_seq'가 1부터 100까지인 학생들의 'phone' 컬럼을 업데이트합니다.
-- CONCAT() 함수로 '010'과 8자리의 임의의 숫자를 결합하여 11자리 번호를 만듭니다.
-- LPAD() 함수는 생성된 숫자가 8자리보다 짧을 경우 앞에 0을 채워줍니다.
UPDATE student
SET phone = CONCAT('010', LPAD(FLOOR(RAND() * 90000000) + 10000000, 8, '0'))
WHERE student_seq BETWEEN 1 AND 100;

-- 'employee_seq'가 1부터 13까지인 직원들의 'phone' 컬럼을 업데이트합니다.
-- 생성된 번호가 'student' 테이블에 이미 존재하는 번호와 겹치지 않을 경우에만 업데이트를 진행합니다.
UPDATE employee
SET phone = CONCAT('010', LPAD(FLOOR(RAND() * 90000000) + 10000000, 8, '0'))
WHERE employee_seq BETWEEN 1 AND 13
  AND CONCAT('010', LPAD(FLOOR(RAND() * 90000000) + 10000000, 8, '0')) NOT IN (SELECT phone
                                                                               FROM student);