import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SalesByProductCategory = () => {
    const chartRef = useRef(null);
    // Define a color palette with 26 distinct colors
    const colors = [
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF',
    ];

    const [chartOptions, setChartOptions] = useState({
        colors: colors,
        chart: {
            type: 'bar',
        },
        xaxis: {
            categories: [],
            title: {
                text: 'Product Categories',
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
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/sales-forecasting/category-sales');
                const data = await response.json();
                setChartOptions(prevOptions => ({
                    ...prevOptions,
                    xaxis: {
                        ...prevOptions.xaxis,
                        categories: data.map(item => item.product_category),
                    }
                }));
                setChartSeries([{
                    name: 'Total Sales',
                    data: data.map((item: { total_sales: any; }) => item.total_sales),
                }]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const downloadPdf = () => {
        if (chartRef.current) {
            html2canvas(chartRef.current).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape',
                });
                pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
                pdf.save('sales-by-product-category.pdf');
            });
        }
    };

    return (
        <div ref={chartRef} className="chart-container">
            <h1 className="inline-block px-2 py-1 bg-blue text-center" style={{ color: '#15cfd1' }}>Sales by Product Category</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        width="80%"
                    />
                    <button onClick={downloadPdf} className="inline-block px-2 py-1 bg-blue text-center" style={{ color: '#15cfd1', marginTop: 30, marginLeft: 1000 }}>
                        Download PDF
                    </button>
                </>
            )}
        </div>
    );
};

export default SalesByProductCategory;
