/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUturnLeftIcon, CloudArrowUpIcon, CloudIcon } from '@heroicons/react/24/outline';
import { LineChart } from '@mui/x-charts';
import { axiosClient } from '@/src/services/client';

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export default function SimulationResult() {
  const [simulation, setSimulation] = useState(() => {
    const storedSimulation = sessionStorage.getItem('simulationToShow');

    if (storedSimulation) return JSON.parse(storedSimulation);
    return {};
  });

  const validatedIncomes = useMemo(() => {
    let higher = simulation.monthlyVariableIncome
    let lower = simulation.monthlyFixedIncome
    let higherLabel = 'Renda Variável'
    let lowerLabel = 'Renda Fixa'
    let higherIncomeTax = simulation.incomeTaxVariable
    let higherIof = simulation.iofVariable
    let lowerIncomeTax = simulation.incomeTaxFixed
    let lowerIof = simulation.iofFixed

    if (simulation.fixedIncome > simulation.variableIncome) {
      higher = simulation.monthlyFixedIncome
      lower = simulation.monthlyVariableIncome
      higherLabel = 'Renda Fixa'
      lowerLabel = 'Renda Variável'
      higherIncomeTax = simulation.incomeTaxFixed
      higherIof = simulation.iofFixed
      lowerIncomeTax = simulation.incomeTaxVariable
      lowerIof = simulation.iofVariable
    }

    return {
      higher,
      lower,
      higherFinalValue: higher[higher.length -1],
      lowerFinalValue: lower[lower.length -1],
      higherLabel,
      lowerLabel,
      higherIncomeTax,
      higherIof,
      lowerIncomeTax,
      lowerIof
    }
  }, [simulation])

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    if (simulation.id) return;
    setIsLoading(true);

    try {
      const { data, status } = await axiosClient.post('/simulations', simulation);

      if (status !== 200) {
        alert('Houve um erro ao salvar a simulação, por favor tente novamente.');
        return;
      }

      setSimulation({
        ...simulation,
        id: data.id
      });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      alert('Houve um erro ao salvar a simulação, por favor tente novamente.');
    }
  };

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
          ) : isLoading ? (
            'Saving...'
          ) : (
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
      <p>
        Valor inicial do investimento: <span className="text-teal-600 text-bold">{currencyFormatter.format(simulation.initialValue)}</span>
      </p>
      <p>
        Aporte mensal: <span className="text-teal-600 text-bold">{currencyFormatter.format(simulation.monthlyContribution)}</span>
      </p>
      <p>
        Período em meses: <span className="text-teal-600 text-bold">{currencyFormatter.format(simulation.periodInMonths)}</span>
      </p>
      <p>
        Taxa de juros anual (renda fixa): <span className="text-teal-600 text-bold">{simulation.fixedIncome}%</span>
      </p>
      <p>
        Rentabilidade esperada anual + volatilidade (renda variável): <span className="text-teal-600 text-bold">{simulation.variableIncome}%</span>
      </p>

      <h3 className="text-teal-600 text-md font-bold pt-6">Resultados de cada cenário</h3>

      <div className="w-full h-90 max-w-md">
        <LineChart
          series={[
            { data: validatedIncomes.higher, label: validatedIncomes.higherLabel },
            { data: validatedIncomes.lower, label: validatedIncomes.lowerLabel },
          ]}
          xAxis={[{ scaleType: 'point', data: simulation.monthlyVariableIncome.map((_: any, index: number) => `${index + 1}º mês`), height: 28 }]}
          yAxis={[{ width: 50 }]}
          margin={{ right: 24 }}
        />
      </div>

      <p>
        Valor final {validatedIncomes.higherLabel}: <span className="text-teal-600 text-bold">{currencyFormatter.format(validatedIncomes.higherFinalValue)}</span>
      </p>
      <p>
        Valor final {validatedIncomes.lowerLabel}: <span className="text-teal-600 text-bold">{currencyFormatter.format(validatedIncomes.lowerFinalValue)}</span>
      </p>
      <p>
        Diferença: <span className="text-teal-600 text-bold">
          {currencyFormatter.format(validatedIncomes.higherFinalValue - validatedIncomes.lowerFinalValue)}
        </span>
      </p>
      <p>
        Diferença percentual: <span className="text-teal-600 text-bold">
          {((validatedIncomes.higherFinalValue - validatedIncomes.lowerFinalValue)/validatedIncomes.lowerFinalValue*100).toFixed(2)}%
        </span>
      </p>

      <p>
        Imposto de Renda ({validatedIncomes.higherLabel}): <span className="text-teal-600 text-bold">{currencyFormatter.format(validatedIncomes.higherIncomeTax)}</span>
      </p>
      <p>
        IOF ({validatedIncomes.higherLabel}): <span className="text-teal-600 text-bold">{currencyFormatter.format(validatedIncomes.higherIof)}</span>
      </p>
      <p>
        Imposto de Renda ({validatedIncomes.lowerLabel}): <span className="text-teal-600 text-bold">{currencyFormatter.format(validatedIncomes.lowerIncomeTax)}</span>
      </p>
      <p>
        IOF ({validatedIncomes.lowerLabel}): <span className="text-teal-600 text-bold">{currencyFormatter.format(validatedIncomes.lowerIof)}</span>
      </p>
    </div>
  );
}
