/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState} from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUturnLeftIcon, CloudArrowUpIcon, CloudIcon } from '@heroicons/react/24/outline';
import { LineChart } from '@mui/x-charts';
import { axiosClient } from '@/src/services/client';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})

export default function SimulationResult() {
  const [simulation, setSimulation] = useState(() => {
    const storedSimulation = sessionStorage.getItem('simulationToShow')

    if (storedSimulation) return JSON.parse(storedSimulation)
    return {}
  })
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    if (simulation.id) return
    setIsLoading(true)

    try {
      const { data, status } = await axiosClient.post('/simulations', simulation)
  
      if (status !== 200) {
        alert("Houve um erro ao salvar a simulação, por favor tente novamente.")
        return
      }
  
      setSimulation(data)
      setIsLoading(false)
    } catch {
      setIsLoading(false)
      alert("Houve um erro ao salvar a simulação, por favor tente novamente.")
    }
    
  }

  return (
    <div className="flex flex-col items-center pb-6 w-full">
      <div className="flex justify-between px-6 w-full">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-teal-600 cursor-pointer">
          <ArrowUturnLeftIcon className="size-4" />
          Voltar
        </button>
        <button onClick={handleSave} className="flex items-center gap-2 text-teal-600 cursor-pointer">
          {simulation.id ? (
            <>
              <CloudIcon className="size-6" />
              Salvo
            </>
          ) : (
            isLoading ? "Saving..." :
            <>
              <CloudArrowUpIcon className="size-6" />
              Salvar
            </>
          )}
        </button>
      </div>

      <h1 className="text-teal-600 text-xl font-bold pt-6">{simulation?.name}</h1>
      <p>Criada em: {new Date(simulation.createdAt ?? '').toLocaleString()}</p>

      <h3 className="text-teal-600 text-md font-bold pt-6">Valores de entrada</h3>
      <p>Valor inicial do investimento: <span className="text-teal-600 text-bold">{currencyFormatter.format(simulation.initialValue)}</span></p>
      <p>Aporte mensal: <span className="text-teal-600 text-bold">{currencyFormatter.format(simulation.monthlyContribution)}</span></p>
      <p>Período em meses: <span className="text-teal-600 text-bold">{currencyFormatter.format(simulation.periodInMonths)}</span></p>
      <p>Taxa de juros anual (renda fixa): <span className="text-teal-600 text-bold">{simulation.fixedIncome}%</span></p>
      <p>Rentabilidade esperada anual + volatilidade (renda variável): <span className="text-teal-600 text-bold">{simulation.variableIncome}%</span></p>

      <h3 className="text-teal-600 text-md font-bold pt-6">Valor final projetado para cada cenário</h3>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            label: "Renda fixa"
          },
          {
            data: [1, 6, 3, 9, 3, 2],
            label: "Renda variável"
          },
        ]}
      />
        
      <p>Imposto de Renda: <span className="text-teal-600 text-bold">{simulation.incomeTax}</span></p>
      <p>IOF: <span className="text-teal-600 text-bold">{simulation.iof}</span></p>
    </div>
  );
}
