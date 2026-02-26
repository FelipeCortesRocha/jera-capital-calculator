import * as yup from 'yup';

const transform = (currentValue: string | number, originalValue: string | number | null) => {
  return originalValue === '' ? null : currentValue;
};

export const SimulationSchema = yup.object().shape({
  name: yup.string().required('Por favor insira o "Nome da simulação"'),
  initialValue: yup.number().transform(transform).required('Por favor insira o "Valor inicial do investimento"'),
  monthlyContribution: yup.number().nullable().transform(transform),
  periodInMonths: yup.number().transform(transform).required('Por favor insira o "Período em meses"'),
  fixedIncome: yup.number().transform(transform).required('Por favor insira a "Taxa de juros anual"'),
  variableIncome: yup.number().transform(transform).required('Por favor insira a "Rentabilidade esperada anual + volatilidade"'),
  date: yup.date().nullable()
});
