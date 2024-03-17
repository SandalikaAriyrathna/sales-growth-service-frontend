const DataTable = () => {
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    
    {/* Date Range topic */}
    <div className="flex items-center justify-between mb-5">
        <h3 className="text-title-sm font-bold text-black dark:text-white">Date Range</h3>
       
        
    </div>
        <p>select a single date or rangeof datesup to 31 days</p><br/>
        <div className="flex mb-5">
                
                  <input
                    type="date"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <p className="m-5">to</p> 
                   <input
                    type="date"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              <br/>

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
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                <button
                    className="flex items-center justify-center hover:text-primary p-1 border border-transparent rounded"
                    style={{
                    backgroundColor: 'white', // Button has white background by default
                    color: 'black', // Text color is black by default
                    transition: 'all 0.3s ease-in-out',
                    }}
                    onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbbf24'; // Yellow background on hover
                    e.currentTarget.style.color = 'black'; // Text color changes if needed
                    }}
                    onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'; // White background when not hovered
                    e.currentTarget.style.color = 'black'; // Text color reverts if needed
                    }}
                >
                    Export CSV
                    <svg
                    className="ml-2 fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: 'currentColor' }} // SVG color is current text color
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
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    Tablet
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">Electronic</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">Apple</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">30</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">Male</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">Central Province</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">View</p>
                </td>
             
              </tr>
             
              
             
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default DataTable;
  