CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('MongoDB', 'https://blog.mongodb.com', 'Mongo Blog');
INSERT INTO blogs (author, url, title) VALUES ('PostgreSQL', 'https://blog.postgresql.com', 'PostgreSQL Blog');