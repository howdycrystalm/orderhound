INSERT INTO employee_info (employee_name, admin, photo, password, email)
VALUES ($1, $2, $3, $4, DEFAULT)
RETURNING *;
