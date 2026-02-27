import * as yup from 'yup';

const transform = (currentValue: string | number, originalValue: string | number | null) => {
  return originalValue === '' ? null : currentValue;
};

export const SimulationSchema = yup.object().shape({
  id: yup.string().nullable(),
  name: yup.string().required('Por favor insira o "Nome da simulação"'),
  initialValue: yup.number().transform(transform).positive().required('Por favor insira o "Valor inicial do investimento"'),
  monthlyContribution: yup.number().transform(transform).positive().nullable(),
  periodInMonths: yup.number().transform(transform).positive().required('Por favor insira o "Período em meses"'),
  fixedIncome: yup.number().transform(transform).positive().required('Por favor insira a "Taxa de juros anual"'),
  variableIncome: yup.number().transform(transform).positive().required('Por favor insira a "Rentabilidade esperada anual + volatilidade"'),
  monthlyFixedIncome: yup.number().transform(transform).positive().nullable(),
  monthlyVariableIncome: yup.number().transform(transform).positive().nullable(),
  incomeTaxFixed: yup.number().transform(transform).positive().nullable(),
  iofFixed: yup.number().transform(transform).positive().nullable(),
  incomeTaxVariable: yup.number().transform(transform).positive().nullable(),
  iofFixedVariable: yup.number().transform(transform).positive().nullable(),
  profitabilityFixed: yup.number().transform(transform).positive().nullable(),
  profitabilityVariable: yup.number().transform(transform).positive().nullable(),
  createdAt: yup.date().nullable(),
});
