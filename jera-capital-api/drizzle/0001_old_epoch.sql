ALTER TABLE `simulations` ADD `income_tax_fixed` numeric;--> statement-breakpoint
ALTER TABLE `simulations` ADD `iof_fixed` numeric;--> statement-breakpoint
ALTER TABLE `simulations` ADD `income_tax_variable` numeric;--> statement-breakpoint
ALTER TABLE `simulations` ADD `iof_variable` numeric;--> statement-breakpoint
ALTER TABLE `simulations` ADD `profitability_fixed` numeric;--> statement-breakpoint
ALTER TABLE `simulations` ADD `profitability_variable` numeric;--> statement-breakpoint
ALTER TABLE `simulations` DROP COLUMN `income_tax`;--> statement-breakpoint
ALTER TABLE `simulations` DROP COLUMN `iof`;