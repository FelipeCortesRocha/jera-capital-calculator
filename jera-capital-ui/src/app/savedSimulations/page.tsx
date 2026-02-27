/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { axiosClient } from '@/src/services/client';
import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SimulationResult() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedSimulations, setSavedSimulations] = useState([]);

  const getSavedSimulations = async () => {
    setIsLoading(true)
    const { data } = await axiosClient.get('/simulations');

    setSavedSimulations(data);
    setIsLoading(false);
  };

  const handleDelete = async (simulationId: string) => {
    setIsLoading(true)
    const { status } = await axiosClient.delete(`/simulations/${simulationId}`)

    setIsLoading(false)
    if (status !== 204) {
      alert('Algo deu errado durante a deleção, por favor tente novamente')
      return
    }
    getSavedSimulations()
  }

  useEffect(() => {
    getSavedSimulations();
  }, []);

  return (
    <>
      <h1 className="text-teal-600 text-xl font-bold pb-6">Simulações salvas</h1>

      {isLoading ? (
        <span>Loading...</span>
      ) : (
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
              {savedSimulations.map((simulation: any) => (
                <tr key={simulation.id} className="flex flex-col md:block items-center bg-neutral-primary border-b border-default">
                  <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap text-ellipsis overflow-hidden w-md max-w-md">
                    {simulation.name}
                  </th>
                  <td className="px-6 py-4">{new Date(simulation.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Link
                      href="/simulationResult"
                      onClick={() => sessionStorage.setItem('simulationToShow', JSON.stringify(simulation))}
                      className="bg-teal-600 hover:bg-teal-800 hover:cursor-pointer py-2 px-4 rounded-md text-white"
                    >
                      Ver
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <TrashIcon className="size-4 text-red-600" onClick={() => handleDelete(simulation.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
