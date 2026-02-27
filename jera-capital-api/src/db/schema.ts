import { sqliteTable, text, numeric } from 'drizzle-orm/sqlite-core';

export const SimulationsTable = sqliteTable('simulations', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    initialValue: numeric('initial_value').notNull(),
    monthlyContribution: numeric('monthly_contribution'),
    periodInMonths: numeric('period_in_months').notNull(),
    fixedIncome: numeric('fixed_income').notNull(),
    variableIncome: numeric('variable_income').notNull(),
    monthlyFixedIncome: text('monthly_fixed_income'),
    monthlyVariableIncome: text('monthly_variable_income'),
    incomeTaxFixed: numeric('income_tax_fixed'),
    iofFixed: numeric('iof_fixed'),
    incomeTaxVariable: numeric('income_tax_variable'),
    iofFixedVariable: numeric('iof_variable'),
    profitabilityFixed: numeric('profitability_fixed'),
    profitabilityVariable: numeric('profitability_variable'),
    createdAt: numeric('created_at')
});
