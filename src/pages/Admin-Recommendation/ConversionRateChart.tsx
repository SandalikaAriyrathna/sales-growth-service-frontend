import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 0.12,
  },
};

const ConversionRateChart = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: 'Conversion Rate',
      data: []  // Data will be an array of conversion rates
    }],
    options: {
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: []  // Categories will be an array of months
      },
      yaxis: {
        title: {
          text: 'Conversion Rate (%)'
        }
      },
      stroke: {
        curve: 'smooth'
      },
      // Add more chart options as needed
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + 'conversion-rates/');
      const data = await response.json();
      const months = data.map(entry => entry.month_name);
      const rates = data.map(entry => entry.conversion_rate);
      const total_trials = data.map(entry => entry.total_trials);
      const total_conversions = data.map(entry => entry.total_conversions);
      
      setChartData(prevState => ({
        ...prevState,
        series: [{ name: 'Conversion Rate', data: rates},
                 { name: 'Total Trials', data: total_trials},
                 { name: 'Total Conversions', data: total_conversions}],
        options: {
          ...prevState.options,
          xaxis: { categories: months }
        }
      }));
    };

    fetchData();
  }, []);

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
       
      </div>

      <div>
       
        <div id="ConversionRateChart"  className="-ml-5">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
      </div>
    </div>
  );
};

export default ConversionRateChart;
