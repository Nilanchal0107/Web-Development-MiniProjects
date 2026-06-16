/*

Run the CRUD operations from the Data Manipulation chapter

*/

-- Insert example
  
  INSERT INTO cars (
	brand, model, year, price, color, condition, sold
) VALUES (
	'Ford', 'Escort RS2000', 1978, 39000, 'blue', 4, FALSE
), (
	'Aston Martin', 'V8 Vantage', 1977, 145000, 'dark green', 5, FALSE
);

-- Insert challenge
  
  INSERT INTO cars (
	brand, model, year, price, color, condition, sold
) VALUES (
	'Chevrolet', 'Bel Air', 1955, 50000, 'purple', 5, FALSE
), (
	'Porsche', '944 Turbo', 1986, 48000, 'white', 4, FALSE
);


-- Update example
  
  UPDATE cars SET
	  sold = TRUE
  WHERE brand = 'Ford'
  AND model = 'Escort RS2000';

-- Update challenge
  
  UPDATE cars SET
	price = 72000, condition = 5
  WHERE brand = 'Porsche' AND model = '944 Turbo';

--  Delete example
  
  DELETE FROM cars
	WHERE condition = 0;

--  Delete challenge
  
  DELETE FROM cars
	WHERE sold IS TRUE;