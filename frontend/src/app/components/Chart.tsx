'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import {useEffect, useState} from "react";
import {CountryDetailsInterface} from "@/app/interfaces/countryDetailsInterface";

interface DatasetInterface {
  label: string;
  data: number[];
  backgroundColor: string;
  barThickness: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ countries, stat }: { countries: Partial<CountryDetailsInterface>[], stat: string }) => {
  const [datasets, setDatasets] = useState<DatasetInterface[]>([]);
  const data: ChartData<'bar'> = {
    labels: [stat],
    datasets: datasets,
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: false,
      }
    }
  };

  useEffect(() => {
    setDatasets([]);
    countries.forEach((country, index) => {
      setDatasets((prev): DatasetInterface[] => {
        const exists = prev.some((dataset) => dataset.label === country.name?.common);

        if (!exists && country.name && country.population && country.area) {
          return [
            ...prev,
            {
              label: country.name.common,
              data: [stat === 'population' ? country.population : country.area],
              backgroundColor: `${index === 0 ? 'rgba(153, 102, 255, 0.8)' : 'rgba(255, 77, 77, 0.8)'}`,
              barThickness: 25,
            },
          ];
        }
        return prev;
      });
    });
  }, [countries, stat]);

  return <Bar data={data} options={options} />;
};

export default Chart;