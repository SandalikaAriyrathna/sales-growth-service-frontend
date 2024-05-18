import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ConversionRateChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      { name: 'Conversion Rate', data: [] },
      { name: 'Total Trials', data: [] },
      { name: 'Total Conversions', data: [] }
    ],
    options: {
      chart: {
        type: 'area',
        height: 350
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: 'Conversion Rate (%)'
        }
      },
      stroke: {
        curve: 'smooth'
      },
    }
  });

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const fetchData = async (year) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}conversion-rates/?year=${year}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const months = data.map(entry => entry.month_name);
      const rates = data.map(entry => parseFloat(entry.conversion_rate.toFixed(2)));
      const total_trials = data.map(entry => parseFloat(entry.total_trials.toFixed(2)));
      const total_conversions = data.map(entry => parseFloat(entry.total_conversions.toFixed(2)));

      setChartData(prevState => ({
        ...prevState,
        series: [
          { name: 'Conversion Rate', data: rates },
          { name: 'Total Trials', data: total_trials },
          { name: 'Total Conversions', data: total_conversions }
        ],
        options: {
          ...prevState.options,
          xaxis: { categories: months }
        }
      }));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Trial Conversion Rate</p>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="year-select">Year: </label>
          <select id="year-select" value={selectedYear} onChange={handleYearChange}>
            {[currentYear - 3, currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div id="ConversionRateChart" className="-ml-5">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ConversionRateChart;
