use prj5;

# 공지사항
# 작성자는 매핑으로 가져오기
CREATE TABLE notice
(
    notice_seq  INT PRIMARY KEY,
    title       VARCHAR(255)  NOT NULL,
    content     VARCHAR(1000) NOT NULL,
    inserted_at DATETIME      NOT NULL DEFAULT NOW(),
    author_seq  INT           NULL
#     FOREIGN KEY (`author_seq`) REFERENCES employee (`employee_seq`)
);
DROP TABLE notice;
