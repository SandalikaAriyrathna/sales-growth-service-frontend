import { useEffect, useState } from 'react';

// Define a type for your data
type CombinedData = {
  product_name: string;
  category_code: string;
  brand: string;
  age: number;
  gender: string;
  location: string;
  event_type: string;
  event_time: string;
  // Add more fields as needed
};

const DataTable = () => {
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]); // Annotate with CombinedData[] type
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Initial fetch without date filtering
    fetchData();
  }, []);

  const fetchData = async (start = '', end = '') => {
    let url = import.meta.env.VITE_API_URL + `combined-data/`;
  
    // Format dates to 'YYYY-MM-DD' format
    const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
    const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : '';
  
    // Add query parameters if start and end dates are provided
    if (formattedStartDate && formattedEndDate) {
      url += `?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: CombinedData[] = await response.json();
      console.log('Fetched data:', data);
      setCombinedData(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  

  // Function to handle the date filter submission
  const handleFilterSubmit = () => {
    console.log('Start date:', startDate);
    fetchData(startDate, endDate);
  };

  const handleExportCSV = () => {
    // Add column headers
    const headers = Object.keys(combinedData[0]);
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";

    // Format the combined data into CSV string
    csvContent += combinedData.map(data => Object.values(data).join(",")).join("\n");

    // Create a temporary anchor element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "combined_data.csv");

    // Trigger the download
    document.body.appendChild(link); // Required for Firefox
    link.click();

    // Clean up
    document.body.removeChild(link);
  };



  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      {/* Date Range topic */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-title-sm font-bold text-black dark:text-white">Date Range</h3>


      </div>
      <div className="flex items-center justify-between mb-5">

        <p>select a single date or range of dates upto 31 days</p><br />
        <th className="py-4 px-4 font-medium text-black dark:text-white flex-end">
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center hover:text-primary p-1 border border-transparent rounded"
            style={{
              backgroundColor: 'white',
              color: 'black',
              transition: 'all 0.3s ease-in-out',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#fbbf24';
              e.currentTarget.style.color = 'black';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'black';
            }}
          >
            Export CSV
            <svg
              className="ml-2 fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: 'currentColor' }}
            >
              <path
                d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                fill=""
              />
              <path
                d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                fill=""
              />
            </svg>
          </button>

        </th>
      </div>
      <div className="flex items-center justify-between mb-5">
      <div className="flex items-center justify-between mb-5">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="custom-input-date w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="mx-2">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="custom-input-date w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <button
          onClick={handleFilterSubmit}
          className="ms-10 inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Filter
        </button>
        </div>
        

      </div>

      <br />

      <div className="max-w-full overflow-x-auto">

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">

              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Product
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Category
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Brand
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                age
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Gender
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Location
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Event type
              </th>


            </tr>
          </thead>
          <tbody>

            {combinedData.map((data, index) => (
              <tr key={index}>

                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {data.product_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data.category_code}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data.brand}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data.age}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data.gender}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data.location}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data.event_type}</p>
                </td>

              </tr>
            ))}


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
