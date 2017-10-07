create table user_table(
  id varchar(10) PRIMARY KEY,
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL
);

--  CONSTRAINT UNIQUE(username)
