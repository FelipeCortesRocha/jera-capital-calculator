'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const savedSimulations = [
  {
    id: 1,
    name: 'Simulação 1',
    date: new Date(),
  },
  {
    id: 2,
    name: 'Simulação 2',
    date: new Date(),
  },
  {
    id: 3,
    name: 'Simulação 3',
    date: new Date(),
  },
  {
    id: 4,
    name: 'Simulação 4 com nome maior pra evitar quebrar ainda ta pequeno precisa ser ainda maior pra quebrar',
    date: new Date(),
  },
];

export default function SimulationResult() {
  return (
    <>
      <h1 className="text-teal-600 text-xl font-bold pb-6">Simulações salvas</h1>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mb-6">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="hidden md:block text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium w-md">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Data
              </th>
              <th scope="col" className="px-6 py-3 font-medium"></th>
              <th scope="col" className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {savedSimulations.map(simulation => (
              <tr key={simulation.id} className="flex flex-col md:block items-center bg-neutral-primary border-b border-default">
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap text-ellipsis overflow-hidden w-md max-w-md">
                  {simulation.name}
                </th>
                <td className="px-6 py-4">{simulation.date.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <Link href="/simulationResult" onClick={() => localStorage.setItem('simulationToShow', JSON.stringify(simulation))}className="bg-teal-600 hover:bg-teal-800 hover:cursor-pointer py-2 px-4 rounded-md text-white">Ver</Link>
                </td>
                <td className="px-6 py-4">
                  <TrashIcon className="size-4 text-red-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
