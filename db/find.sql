-- INSERT INTO find_request (date, po_num)
-- VALUES ($1, $2)
/*RETURNING *; may or may not need this*/

UPDATE find_request
SET date = $1
WHERE po_num = $2;
-- AND checkpoint_id = $3;
