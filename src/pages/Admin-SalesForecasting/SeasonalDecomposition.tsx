import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SeasonalDecomposition = () => {
    const chartRef = useRef(null);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'line',
            zoom: {
                enabled: true,
            },
        },
        xaxis: {
            categories: [],
            title: {
                text: 'Date',
            },
            labels: {
                rotate: -45,
                rotateAlways: true,
                hideOverlappingLabels: true,
            },
        },
        yaxis: {
            title: {
                text: 'Value',
            },
            labels: {
                formatter: (value) => `$${value.toFixed(2)}`,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: {
                horizontal: 10,
                vertical: 5,
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (value) => `$${value.toFixed(2)}`,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
    });
    const [chartSeries, setChartSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');

    const fetchData = async (year, week) => {
        setIsLoading(true);
        setError(null);
        try {
            const url = `http://127.0.0.1:8000/api/v1/sales-forecasting/seasonal-decompose?period=4&year=${year}&week=${week}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('Seasonal Decomposition data:', data);

            if (!data.sales.length) {
                throw new Error('No valid data available for the selected period');
            }

            setChartOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: data.date,
                }
            }));

            setChartSeries([
                {
                    name: 'Sales',
                    data: data.sales,
                },
                {
                    name: 'Seasonal',
                    data: data.seasonal,
                },
                {
                    name: 'Trend',
                    data: data.trend,
                },
                {
                    name: 'Residual',
                    data: data.resid,
                }
            ]);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedYear && selectedWeek) {
            fetchData(selectedYear, selectedWeek);
        }
    }, [selectedYear, selectedWeek]);

    const downloadPdf = () => {
        if (chartRef.current) {
            html2canvas(chartRef.current).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape',
                });
                pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
                pdf.save('seasonal-decomposition.pdf');
            });
        }
    };

    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    const generateYearOptions = () => {
        const currentYear = getCurrentYear();
        const years = [];
        for (let year = 2023; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    };

    const generateWeekOptions = () => {
        const weeks = [];
        for (let week = 1; week <= 52; week++) {
            weeks.push(week.toString().padStart(2, '0'));
        }
        return weeks;
    };

    return (
        <div ref={chartRef} className="chart-container">
            <h1 className="inline-block px-2 py-1 bg-blue text-center" style={{ color: '#15cfd1' }}>Seasonal Decomposition</h1>
            <div className="selector">
                <label htmlFor="year">Select Year: </label>
                <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">Select Year</option>
                    {generateYearOptions().map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <label htmlFor="week">Select Week: </label>
                <select id="week" value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                    <option value="">Select Week</option>
                    {generateWeekOptions().map(week => (
                        <option key={week} value={week}>
                            {`Week ${week}`}
                        </option>
                    ))}
                </select>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
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

export default SeasonalDecomposition;
