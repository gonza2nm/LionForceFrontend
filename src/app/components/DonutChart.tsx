import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({
  ingresos,
  egresos,
}: {
  ingresos: number;
  egresos: number;
}) {
  const data = {
    labels: ['Ingresos', 'Egresos'],
    datasets: [
      {
        data: [ingresos, egresos],
        backgroundColor: ['#4CAF50', '#F44336'], // Verde para ingresos, rojo para egresos
        hoverOffset: 4,
      },
    ],
  };
  const saldo = ingresos - egresos;
  const saldoFormateado = saldo.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const isNegative = saldo < 0;

  return (
    <div className="chart-container fs-4">
      <Doughnut data={data} />
      <span>
        Saldo:{' '}
        <span
          className={
            isNegative
              ? 'align-self-center text-danger'
              : 'align-self-center text-success'
          }
        >
          ${saldoFormateado}
        </span>
      </span>
    </div>
  );
}
