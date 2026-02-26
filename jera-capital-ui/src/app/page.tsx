'use client';

import SimulationForm from '../components/SimulationForm';

export default function Home() {
  return (
    <>
      <h1 className="text-teal-600 text-xl font-bold pb-6">Nova simulação</h1>

      <SimulationForm />
    </>
  );
}
