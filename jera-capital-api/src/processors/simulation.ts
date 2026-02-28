interface SimulationInput {
    name: string
    initialValue: number
    monthlyContribution: number
    periodInMonths: number
    fixedIncome: number
    variableIncome: number
    createdAt: Date
}

const getIncomePercentage = (days: number) => {
    if (days <= 180) return 22.5
    if (days <= 360) return 20
    if (days <= 720) return 17.5
    return 15
}

const floatToFixed = (value: number) => parseFloat(value.toFixed(2))

export const calculateSimulation = (input: SimulationInput) => {
    let actualValueFixed = input.initialValue
    let actualValueVariable = input.initialValue

    const monthlyFixedIncome = []
    const monthlyVariableIncome = []
    let incomeTaxFixed = 0
    let iofFixed = 0
    let incomeTaxVariable = 0
    let iofVariable = 0

    const amountOfDays = Math.floor(input.periodInMonths * 30)
    const fixedIncomePerDay = input.fixedIncome/30
    const variableIncomePerDay = input.variableIncome/30

    for (let i = 1; i <= amountOfDays; i++) {
        
        const dayFixedValue = actualValueFixed + (actualValueFixed * (fixedIncomePerDay/100))
        actualValueFixed = dayFixedValue
        
        const dayVariableValue = actualValueVariable + (actualValueVariable * (variableIncomePerDay/100))
        actualValueVariable = dayVariableValue
        
        if (i%30 === 0) {
            actualValueFixed += input.monthlyContribution
            actualValueVariable += input.monthlyContribution
        }

        if (i%30 === 0 || i === amountOfDays) {
            monthlyFixedIncome.push(floatToFixed(dayFixedValue))
            monthlyVariableIncome.push(floatToFixed(dayVariableValue))
        }

        if (i === amountOfDays) {

            const iofPercentage = amountOfDays > 30 ? 0 : 96 - ((amountOfDays - 1) * 3)
            const incomePercentage = getIncomePercentage(amountOfDays)

            const profitabilityFixed = actualValueFixed - input.initialValue
            const profitabilityVariable = actualValueVariable - input.initialValue

            iofFixed = floatToFixed(profitabilityFixed * (iofPercentage/100))
            incomeTaxFixed = floatToFixed((profitabilityFixed - iofFixed) * (incomePercentage/100))

            iofVariable = floatToFixed(profitabilityVariable * (iofPercentage/100))
            incomeTaxVariable = floatToFixed((profitabilityVariable - iofVariable) * (incomePercentage/100))

            return {
                ...input,
                monthlyFixedIncome,
                monthlyVariableIncome,
                incomeTaxFixed,
                iofFixed,
                incomeTaxVariable,
                iofVariable,
                profitabilityFixed: floatToFixed(((profitabilityFixed - iofFixed) - incomeTaxFixed)),
                profitabilityVariable: floatToFixed(((profitabilityVariable - iofVariable) - incomeTaxVariable))
            }
        }
    }

    return input
}
