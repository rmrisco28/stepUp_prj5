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

# auth

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
    # member_seq INT
    # use_yn CHAR
);
DROP TABLE student;

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