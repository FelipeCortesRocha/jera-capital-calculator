/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as yup from 'yup'
import { SimulationSchema } from "@/src/schemas/simulation";
import { useMemo} from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

type Simulation = yup.InferType<typeof SimulationSchema>;

export default function SimulationResult() {
  const router = useRouter();

  const simulation: Simulation = useMemo(() => {
    const storedSimulation = localStorage.getItem('simulationToShow')

    if (storedSimulation) return JSON.parse(storedSimulation)
  }, [])

  return (
    <>
      <button onClick={() => router.back()} className="flex items-center gap-2 text-teal-600 cursor-pointer fixed left-12 top-24"><ArrowUturnLeftIcon className="size-4" /> Voltar</button>
      
      <h1 className="text-teal-600 text-xl font-bold pt-6">{simulation?.name}</h1>
      <p>Criada em: {new Date(simulation.date ?? '').toLocaleString()}</p>
      

      <h3 className="text-teal-600 text-md font-bold pt-6">Valores de entrada:</h3>
      <p>Valor inicial do investimento: <span className="text-teal-600 text-bold">{simulation.initialValue}</span></p>
      <p>Aporte mensal: <span className="text-teal-600 text-bold">{simulation.monthlyContribution}</span></p>
      <p>Período em meses: <span className="text-teal-600 text-bold">{simulation.periodInMonths}</span></p>
      <p>Taxa de juros anual (renda fixa): <span className="text-teal-600 text-bold">{simulation.fixedIncome}</span></p>
      <p>Rentabilidade esperada anual + volatilidade (renda variável): <span className="text-teal-600 text-bold">{simulation.variableIncome}</span></p>
    </>
  );
}
