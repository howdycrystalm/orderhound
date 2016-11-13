SELECT employee_name, checkpoint_name, photo
FROM employee_info
INNER JOIN checkpoints
ON checkpoints.employee_id = employee_info.id;
