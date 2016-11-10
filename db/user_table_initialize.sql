CREATE TABLE IF NOT EXISTS employee_info (
  id SERIAL PRIMARY KEY,
  employee_name varchar(50),
  admin boolean,
  photo null,
  password varchar(50)
);
