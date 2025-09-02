CREATE TABLE member
(
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    nick_name   VARCHAR(255) NOT NULL UNIQUE,
    info        VARCHAR(255) NULL,
    inserted_at datetime     NOt NULL DEFAULT NOW(),
    CONSTRAINT pk_member PRIMARY KEY (email)
);