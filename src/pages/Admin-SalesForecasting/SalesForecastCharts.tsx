import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


interface ChartData {
  name: string;
  data: { x: string; y: number }[];
}

const SalesChart: React.FC = () => {
  const [series, setSeries] = useState<ChartData[]>([]);
  // const [notification, setNotification] = useState('');
  const chartRef = useRef(null); // Ref for the chart container
  const [options, setOptions] = useState({
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
      colors: ['#fff'],
      strokeColors: ['#3056D3'],
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
      type: 'datetime',
      categories: [],
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/sales-forecasting/combined-sales');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData = await response.json();
        // const transformedData = rawData.map((item: any) => ({ x: `${item.sale_year}-${item.sale_month}`, y: item.total_sales }));
        
        // setSeries([{ name: 'Total Sales', data: transformedData }]);
         // Assuming last entry is the predicted sales
         const actualSalesData = rawData.slice(0, -1); // all but the last entry
         const predictedSalesData = rawData[rawData.length - 1]; // last entry

         // Calculate mean of actual sales
        const meanActualSales = actualSalesData.reduce((sum, record) => sum + record.total_sales, 0) / actualSalesData.length;
        // Check if predicted sales is significantly higher or lower than the mean
        const threshold = 0.1; // e.g., 10%
        if (predictedSalesData.total_sales < meanActualSales * (1 - threshold)) {
          alert('The predicted sales for the upcoming month is significantly lower than the average.');
        } else if (predictedSalesData.total_sales > meanActualSales * (1 + threshold)) {
          alert('The predicted sales for the upcoming month is significantly higher than the average.');
        }

        // Transform data for chart
        const transformedData = rawData.map(item => ({ x: `${item.sale_year}-${item.sale_month}`, y: item.total_sales }));
        setSeries([{ name: 'Total Sales', data: transformedData }]);

        
        // Update options to highlight the last point
        setOptions(prevOptions => ({
          ...prevOptions,
          markers: {
            ...prevOptions.markers,
            discrete: [{
              seriesIndex: 0,
              dataPointIndex: transformedData.length - 1,
              fillColor: '#eeff00',
              strokeColor: '#eeff00',
              size: 6
            }]
          }
        }));
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const dataUrl = canvas.toDataURL();

      const pdf = new jsPDF({
        orientation: 'landscape',
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('chart.pdf');
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div ref={chartRef}>
      <h1 className="inline-block px-2 py-1 bg-blue text-center" style={{ color: '#15cfd1', marginLeft: 400, fontSize: 20 }}>Future Sales Prediction</h1>
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>

      <button onClick={downloadPDF} className="inline-block px-2 py-1 bg-blue text-center " style={{ color: '#15cfd1', marginTop: 30, marginLeft: 1000 }}>
        Download PDF
      </button>
    </div>
  );
};

export default SalesChart;
