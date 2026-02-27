CREATE TABLE `simulations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`initial_value` numeric NOT NULL,
	`monthly_contribution` numeric,
	`period_in_months` numeric NOT NULL,
	`fixed_income` numeric NOT NULL,
	`variable_income` numeric NOT NULL,
	`monthly_fixed_income` text,
	`monthly_variable_income` text,
	`income_tax` numeric,
	`iof` numeric,
	`created_at` numeric
);
