import React, { useState } from 'react';
import axios from 'axios';

const DataStock = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/data-stock/upload-csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('Error uploading the file');
    } finally {
      setIsLoading(false);
    }
  };
    return (
        <div>
       <div className="rounded-sm border border-stroke bg-white py-5 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
          Import Existing Data set
          </h4>
        </div>

      
      </div>
    </div>
    <div className="max-w-md mx-auto mt-10">
      <div className="rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-900 dark:border-gray-700 p-6 shadow-md">
        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        </h4>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-gray-700 file:text-blue-700 dark:file:text-gray-200 hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
        />
        <button
          onClick={handleFileUpload}
          disabled={isLoading}
          className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:border-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-blue-300 dark:disabled:bg-gray-500"
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
        </div>
    );
    }

export default DataStock;