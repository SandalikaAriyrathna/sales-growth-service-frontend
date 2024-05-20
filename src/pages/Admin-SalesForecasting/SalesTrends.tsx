import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SalesTrends = () => {
    const chartRef = useRef(null);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'line',
        },
        xaxis: {
            categories: [],
            title: {
                text: 'Date',
            },
        },
        yaxis: {
            title: {
                text: 'Total Sales ($)',
            },
            labels: {
                formatter: (value) => `$${value.toFixed(2)}`,
            },
        },
        dataLabels: {
            enabled: true,
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
        },
        tooltip: {
            y: {
                formatter: (value) => `$${value.toFixed(2)}`,
            },
        },
    });
    const [chartSeries, setChartSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allData, setAllData] = useState({ dates: [], sales: [] });
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/sales-forecasting/sales-trend?start_date=2023-01-01&end_date=2023-12-31');
                const data = await response.json();
                console.log('Sales trend data:', data);

                // Filter out any sales entries that do not have corresponding dates
                const filteredData = {
                    dates: data.dates.filter((date, index) => data.sales[index] !== undefined),
                    sales: data.sales.filter(sale => sale !== undefined),
                };

                setAllData(filteredData);
                setSelectedMonth('2023-01'); // Default to January
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedMonth && allData.dates.length > 0) {
            const filteredDates = allData.dates.filter(date => date.startsWith(selectedMonth));
            const startIdx = allData.dates.findIndex(date => date.startsWith(selectedMonth));
            const endIdx = allData.dates.findIndex(date => !date.startsWith(selectedMonth) && date > selectedMonth, startIdx + 1);
            const filteredSales = allData.sales.slice(startIdx, endIdx === -1 ? undefined : endIdx);

            setChartOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: filteredDates,
                }
            }));
            setChartSeries([{
                name: 'Total Sales',
                data: filteredSales,
            }]);
        }
    }, [selectedMonth, allData]);

    const downloadPdf = () => {
        if (chartRef.current) {
            html2canvas(chartRef.current).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape',
                });
                pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
                pdf.save('sales-trends.pdf');
            });
        }
    };

    return (
        <div ref={chartRef} className="chart-container">
            <h1 className="inline-block px-2 py-1 bg-blue text-center" style={{ color: '#15cfd1' }}>Sales Trends</h1>
            <div className="month-selector">
                <label htmlFor="month">Select Month: </label>
                <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="2023-01">January 2023</option>
                    <option value="2023-02">February 2023</option>
                    <option value="2023-03">March 2023</option>
                    <option value="2023-04">April 2023</option>
                    <option value="2023-05">May 2023</option>
                    <option value="2023-06">June 2023</option>
                    <option value="2023-07">July 2023</option>
                    <option value="2023-08">August 2023</option>
                    <option value="2023-09">September 2023</option>
                    <option value="2023-10">October 2023</option>
                    <option value="2023-11">November 2023</option>
                    <option value="2023-12">December 2023</option>
                </select>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="line"
                        width="80%"
                    />
                    <button onClick={downloadPdf} className="inline-block px-2 py-1 bg-blue text-center" style={{ color: '#15cfd1', marginTop: 30 }}>
                        Download PDF
                    </button>
                </>
            )}
        </div>
    );
};

export default SalesTrends;
