import * as yup from 'yup';
import FormInput from '../FormInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SimulationSchema } from '@/src/schemas/simulation';
import { useRouter } from 'next/navigation';

const SimulationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SimulationSchema),
  });
  const router = useRouter();

  type Simulation = yup.InferType<typeof SimulationSchema>;

  const onSubmit = (data: Simulation) => {
    localStorage.setItem('simulationToShow', JSON.stringify(data))
    router.push('/simulationResult')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput type="text" name="name" label="Nome da simulação" register={register} errors={errors.name} />
      <FormInput type="number" name="initialValue" label="Valor inicial do investimento" register={register} errors={errors.initialValue} />
      <FormInput type="number" name="monthlyContribution" label="Aporte mensal (opcional)" register={register} errors={errors.monthlyContribution} />
      <FormInput type="number" name="periodInMonths" label="Período em meses" register={register} errors={errors.periodInMonths} />
      <FormInput type="number" name="fixedIncome" label="Taxa de juros anual (renda fixa)" register={register} errors={errors.fixedIncome} />
      <FormInput type="number" name="variableIncome" label="Rentabilidade esperada anual + volatilidade (renda variável)" register={register} errors={errors.variableIncome} />

      <button type="submit" className="bg-teal-600 hover:bg-teal-800 hover:cursor-pointer py-2 px-4 rounded-md text-white">
        Simular
      </button>
    </form>
  );
};

export default SimulationForm;
