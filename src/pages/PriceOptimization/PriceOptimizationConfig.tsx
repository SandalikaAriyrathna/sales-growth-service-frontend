import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CheckboxTwo from '../../components/CheckboxTwo';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from 'react-fullscreen-loading';

const Products = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [verifyingChecked, setVerifyingChecked] = useState<boolean>(false);
  const [callbackUrl, setCallbackUrl] = useState<string>('');
  const [autoUpdate, setAutoUpdate] = useState<number>(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveConfiguration();
  };

  useEffect(() => {
    const fetchConfiguration = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + 'config/op_configuration/1',
        );
        const config = response.data;
        setLoading(false);
        setIsChecked(config.send_report === 1);
        setVerifyingChecked(config.verifying_required === 1);
        setCallbackUrl(config.price_update_url || '');
        setAutoUpdate(config.auto_update || 0);
      } catch (error) {
        setLoading(false);
        toast.error('Error occurred while fetching configuration');
        console.error(error);
      }
    };

    fetchConfiguration();
  }, []);

  const saveConfiguration = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + 'config/op_configuration/1',
        {
          send_report: isChecked ? 1 : 0,
          verifying_required: verifyingChecked ? 1 : 0,
          price_update_url: callbackUrl,
          auto_update: autoUpdate,
        },
      );
      setLoading(false);
      toast.success('Configuration updated successfully');
    } catch (error) {
      setLoading(false);
      toast.error('Error occurred while updating configuration');
      console.error(error);
    }
  };

  return (
    <>
      {loading && (
        <Loading loading background="#ababab8a" loaderColor="#3498db" />
      )}
      <form onSubmit={handleSubmit}>
        <Breadcrumb pageName="Price Optimization Configuration" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6">
            <CheckboxTwo
              label="Send a Report Email"
              name="report"
              checked={isChecked}
              onChange={() => {
                console.log(isChecked);

                setIsChecked(!isChecked);
              }}
            />
          </div>
          <div className="mb-6">
            <CheckboxTwo
              label="Verifying and Validating Optimized Prices"
              name="product2"
              checked={verifyingChecked}
              onChange={() => setVerifyingChecked(!verifyingChecked)}
            />
          </div>
          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Auto Update Prices
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                value={autoUpdate}
                onChange={(e) => setAutoUpdate(parseInt(e.target.value))}
              >
                <option value={0}>Disabled</option>
                <option value={1}>Per Month (All products)</option>
                <option value={2}>Per Week (All products)</option>
              </select>
              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Price Update Endpoint
            </label>
            <input
              type="text"
              placeholder="https://example.com/callback"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex justify-center items-center rounded bg-primary p-3 font-medium text-gray"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </>
  );
};

export default Products;
