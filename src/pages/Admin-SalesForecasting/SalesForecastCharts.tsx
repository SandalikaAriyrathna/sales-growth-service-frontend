import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ChartData {
  name: string;
  data: { x: string; y: number }[];
}

const Modal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '80%',
      maxWidth: '600px'
    }}>
      <div style={{ marginBottom: '10px', fontSize: '16px', textAlign: 'center' }}>{message}</div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={{
          border: 'none',
          padding: '8px 16px',
          backgroundColor: '#15cfd1',
          color: 'white',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>Close</button>
      </div>
    </div>
  );
};


const SalesChart: React.FC = () => {
  const [series, setSeries] = useState<ChartData[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const chartRef = useRef(null);

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
      discrete: [{
        seriesIndex: 0,
        dataPointIndex: series[0]?.data.length - 1, // This should target the last data point which is predicted sales
        fillColor: '#FFFF00', // Yellow
        strokeColor: '#FFFF00', // Yellow
        size: 6
      }],
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
        const actualSalesData = rawData.slice(0, -1);
        const predictedSalesData = rawData[rawData.length - 1];

        const meanActualSales = actualSalesData.reduce((sum: any, record: { total_sales: any; }) => sum + record.total_sales, 0) / actualSalesData.length;
        if (predictedSalesData.total_sales < meanActualSales * (1 - 0.1)) {
          setModalMessage('The predicted sales for the upcoming month are significantly lower than the average.');
          setModalVisible(true);
        } else if (predictedSalesData.total_sales > meanActualSales * (1 + 0.1)) {
          setModalMessage('The predicted sales for the upcoming month are significantly higher than the average.');
          setModalVisible(true);
        }

        const transformedData = rawData.map((item: { sale_year: any; sale_month: any; total_sales: any; }) => ({ x: `${item.sale_year}-${item.sale_month}`, y: item.total_sales }));
        setSeries([{ name: 'Total Sales', data: transformedData }]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          markers: {
            ...prevOptions.markers,
            discrete: [{
              seriesIndex: 0,
              dataPointIndex: transformedData.length - 1, // Target the last point specifically
              fillColor: '#FFFF00', // Yellow color for the predicted sales marker
              strokeColor: '#FFFF00', // Ensure the stroke is also yellow
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
      {isModalVisible && <Modal show={isModalVisible} message={modalMessage} onClose={() => setModalVisible(false)} />}
      <div ref={chartRef}>
        <h1 className="inline-block px-2 py-1 bg-blue text-center" style={{ color: '#15cfd1', marginLeft: 400, fontSize: 20 }}>Future Sales Prediction</h1>
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
      <button onClick={downloadPDF} className="inline-block px-2 py-1 bg-blue text-center" style={{ color: '#15cfd1', marginTop: 30, marginLeft: 1000 }}>
        Download PDF
      </button>
    </div>
  );
};

export default SalesChart;
