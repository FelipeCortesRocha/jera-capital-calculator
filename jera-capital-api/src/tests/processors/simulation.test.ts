import { describe, expect, test } from '@jest/globals'
import { calculateSimulation } from '../../processors/simulation'

describe('Calculate Simulation', () => {
    test('calculation should be created without errors', () => {
        const createdAt = new Date()

        expect(
            calculateSimulation({
                variableIncome: 1.4,
                fixedIncome: 1.2,
                periodInMonths: 4,
                monthlyContribution: 10,
                initialValue: 1000,
                name: 'Teste',
                createdAt: createdAt,
            })
        ).toStrictEqual({
            variableIncome: 1.4,
            fixedIncome: 1.2,
            periodInMonths: 4,
            monthlyContribution: 10,
            initialValue: 1000,
            name: 'Teste',
            createdAt: createdAt,
            monthlyFixedIncome: [1012.07, 1034.41, 1057.01, 1079.89],
            monthlyVariableIncome: [1014.1, 1038.53, 1063.31, 1088.44],
            incomeTaxFixed: 20.23,
            iofFixed: 0,
            incomeTaxVariable: 22.15,
            iofVariable: 0,
            profitabilityFixed: 69.66,
            profitabilityVariable: 76.29,
        })
    })
})
