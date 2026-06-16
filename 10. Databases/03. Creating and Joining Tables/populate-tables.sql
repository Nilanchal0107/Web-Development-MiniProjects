/*
	Add the following data to the dealerships table:
	
	| city         | state | established |
	| ------------ | ----- | ----------- |
	| Chicago      | IL    | 2022-04-14  |
	| Atlanta      | GA    | 2022-04-14  |
	| Detroit      | MI    | 2025-05-01  |
	| Philadelphia | PA    | 2026-07-01  |
	
	Note: dates are in YYYY-MM-DD format
*/

INSERT INTO dealerships ( city, state, established )
	VALUES
	( 'Chicago', 'IL', '2022-04-14' ),
	( 'Atlanta', 'GA', '2022-04-14' ),
	( 'Detroit', 'MI', '2022-04-14' ),
	( 'Philadelphia', 'PA', '2026-07-01');

  /*
	Add the following data to the staff table:
	
	| dealership_id | name            | role               |
	| ------------- | --------------- | ------------------ |
	| 1             | Rodney Ride     | CEO                |
	| 1             | Penny Piston    | Accountant         |
	| 1             | Rhonda Rules    | HR Officer         |
	| 1             | Nina Nitro      | Salesperson        |
	| 1             | Frankie Fender  | Salesperson        |
	| 1             | Mike Anic       | Mechanic           |
	| 1             | Meg A Byte      | Data Administrator |
	
*/

INSERT INTO staff ( dealership_id, name, role )
	VALUES 
	(1, 'Rodney Ride', 'CEO'),
	(1, 'Penny Piston', 'Accountant'),
	(1, 'Rhonda Rules', 'HR Officer'),
	(1, 'Nina Nitro', 'Salesperson'),
	(1, 'Frankie Fender', 'Salesperson'),
	(1, 'Mike Anic', 'Mechanic'),
	(1, 'Meg A Byte', 'Data Administrator');