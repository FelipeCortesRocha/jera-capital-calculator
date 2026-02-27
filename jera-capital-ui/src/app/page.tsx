'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import FormInput from '../components/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { SimulationSchema } from '../schemas/simulation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { axiosClient } from '../services/client';

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SimulationSchema),
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  type Simulation = yup.InferType<typeof SimulationSchema>;

  const onSubmit = async (data: Simulation) => {
    setIsLoading(true);

    try {
      const { data: responseData, status } = await axiosClient.post('/simulations/calculate', {
        ...data,
        createdAt: new Date(),
      });

      setIsLoading(false);

      if (status !== 200) {
        throw new Error();
      }

      sessionStorage.setItem('simulationToShow', JSON.stringify(responseData));
      router.push('/simulationResult');
    } catch {
      setIsLoading(false);
      alert('Algo deu errado durante a simulação, por favor tente novamente');
    }
  };

  return (
    <>
      <h1 className="text-teal-600 text-xl font-bold pb-6">Nova simulação</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput type="text" name="name" label="Nome da simulação" register={register} errors={errors.name} />
        <FormInput type="number" name="initialValue" label="Valor inicial do investimento" register={register} errors={errors.initialValue} />
        <FormInput type="number" name="monthlyContribution" label="Aporte mensal (opcional)" register={register} errors={errors.monthlyContribution} />
        <FormInput type="number" name="periodInMonths" label="Período em meses" register={register} errors={errors.periodInMonths} />
        <FormInput type="number" name="fixedIncome" label="Taxa de juros anual (renda fixa) em %" register={register} errors={errors.fixedIncome} />
        <FormInput type="number" name="variableIncome" label="Rentabilidade esperada anual + volatilidade (renda variável) em %" register={register} errors={errors.variableIncome} />

        <button disabled={isLoading} type="submit" className="bg-teal-600 hover:bg-teal-800 hover:cursor-pointer py-2 px-4 rounded-md text-white">
          Simular
        </button>
      </form>
    </>
  );
}
