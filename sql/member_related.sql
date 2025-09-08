use prj5;

# member
CREATE TABLE member
(
    member_seq      INT AUTO_INCREMENT PRIMARY KEY,
    login_id        VARCHAR(20) NOT NULL UNIQUE,
    password        VARCHAR(255),
    faild_login_cnt INT DEFAULT 0,
    last_login_at   DATETIME
    # user_yn CHAR(1)
);
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
    phone          VARCHAR(20) NOT NULL,
    email          VARCHAR(50) NOT NULL
    # member_seq INT
    # use_yn CHAR
);