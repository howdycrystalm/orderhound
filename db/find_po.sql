INSERT INTO find_request(date, po_number)
VALUES ($1, $2);
/*RETURNING *; may or may not need this*/

-- UPDATE store_po /*table name*/
-- SET date = $1
-- WHERE po_number = $2;
-- AND checkpoint_id = $3;
