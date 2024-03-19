import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import ButtonView from '../../components/ButtonView';
import ButtonDelete from '../../components/ButtonDelete';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';

const Products = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(false);
  const [headings, setHeadings] = useState([
    {
      title: 'Product ID',
      key: 'productId',
    },
    {
      title: 'Product Name',
      key: 'productName',
    },
    {
      title: 'Product Cost',
      key: 'productCost',
    },
    {
      title: 'Max Profit Margin',
      key: 'maxProfitMargin',
    },
    {
      title: 'Min Profit Margin',
      key: 'minProfitMargin',
    },
    {
      title: 'Action',
      key: 'action',
    },
  ]);

  const [data, setData] = useState([]);

  const getAllProducts = async () => {
    console.log(import.meta.env.VITE_API_URL);
    await axios
      .get(import.meta.env.VITE_API_URL + 'products')
      .then((response) => {
        const products = response.data.map((product: any) => {
          return {
            productId: product[1],
            productName: product[2],
            productCost: product[5],
            maxProfitMargin: product[7],
            minProfitMargin: product[8],
            action: (
              <div className="flex items-center space-x-3.5">
                <ButtonView
                  onClick={() => {
                    setShowModal(true);
                    setModalData(product[0]);
                  }}
                />
                <ButtonDelete onClick={() => console.log(product)} />
              </div>
            ),
          };
        });
        setData(products);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Products" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <button className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80">
          <svg
            className="fill-current"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
              fill=""
            />
          </svg>
          Add task
        </button>
        <DataTable headings={headings} data={data} />
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-boxdark outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto float-right text-3xl font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" dark:text-gray">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/2 lg:w-2/3 px-4">
                        <div className="mb-4">
                          <h2 className="text-xl font-bold">Product Name</h2>
                          <p className="text-gray-500">Brand</p>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-xl font-bold">Category</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="text-gray-700">
                            <p>Specification Type</p>
                            <p>2DIN Placement</p>
                            <p>Type</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-xl font-bold">
                            $<span className="current-price">1560.00</span>
                          </div>
                          <div className="flex items-center">
                            <p className="text-gray-500 line-through mr-2">
                              $<span className="original-price">1653.00</span>
                            </p>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Products;
