UPDATE in_production
SET curr_date = $1
WHERE po_num = $2
AND checkpoint_id = $3
