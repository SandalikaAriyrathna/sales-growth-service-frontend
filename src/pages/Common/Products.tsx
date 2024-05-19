import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import ButtonView from '../../components/ButtonView';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import CheckboxTwo from '../../components/CheckboxTwo';

const Products = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState<any>({});
  const [optimumPrice, setOptimumPrice] = React.useState<any>(0);
  const [maxMargin, setMaxMargin] = React.useState(0);
  const [minMargin, setMinMargin] = React.useState(0);

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

  const saveProduct = async (id: any) => {
    await axios
      .put(import.meta.env.VITE_API_URL + 'products/' + id, {
        max_margin: maxMargin,
        min_margin: minMargin,
        selling_price: optimumPrice,
      })
      .then((response) => {
        toast.success('Product updated successfully');
        setShowModal(false);
        getAllProducts();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error occured while updating product');
      });
  };

  const getAllProducts = async () => {
    await axios
      .get(import.meta.env.VITE_API_URL + 'products')
      .then((response) => {
        const products = response.data.map((product: any) => {
          return {
            productId: product['product_id'],
            productName: product['product_name'],
            productCost: parseFloat(product['cost'] ?? 0).toFixed(2),
            maxProfitMargin: product['max_margin'],
            minProfitMargin: product['min_margin'],
            action: (
              <div className="flex items-center space-x-3.5">
                <ButtonView
                  onClick={() => {
                    setShowModal(true);
                    setModalData(product);
                    setOptimumPrice(-1);
                    setMaxMargin(product['max_margin'] ?? 0);
                    setMinMargin(product['min_margin'] ?? 0);
                  }}
                />
                {/* <ButtonDelete onClick={() => console.log(product)} /> */}
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

  const getOptimumPrice = async () => {
    var now = new Date();
    await axios
      .post(import.meta.env.VITE_API_URL + 'optimize', {
        product: modalData['product_id'],
        product_category: modalData['product_category'],
        cost: modalData['cost'],
        date: moment(now).format('YYYY-MM-DD'),
        maxProfitMargin: maxMargin,
        minProfitMargin: minMargin,
      })
      .then((response) => {
        toast.success('Optimum price calculated');
        setOptimumPrice(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error occured while calculating optimum price');
      });
  };

  return (
    <>
      <Breadcrumb pageName="Products" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <button className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80">
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
        </button> */}
        <DataTable headings={headings} data={data} />
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed bg-[#ffffff40]  inset-0 z-[10000] outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl opacity-100">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-boxdark outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalData[2]}</h3>
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
                      <div className="w-full px-4">
                        <div className="w-full">
                          <label className="mb-3 block text-black dark:text-white flex ">
                            Product ID :{'  '}
                            <h3 className="text-xl font-bold ml-5">
                              {modalData['product_id']}
                            </h3>
                          </label>
                        </div>
                        <div className="w-full">
                          <label className="mb-3 block text-black dark:text-white flex ">
                            Product Name :{'  '}
                            <h3 className="text-xl font-bold ml-5">
                              {modalData['product_name']}
                            </h3>
                          </label>
                        </div>
                        <div className="w-full">
                          <label className="mb-3 block text-black dark:text-white flex ">
                            Brand :{'  '}
                            <h3 className="text-xl font-bold ml-5">
                              {modalData['product_brand']}
                            </h3>
                          </label>
                        </div>
                        <div className="w-full">
                          <label className="mb-3 block text-black dark:text-white flex ">
                            Catogary :{'  '}
                            <h3 className="text-xl font-bold ml-5">
                              {modalData['product_category']}
                            </h3>
                          </label>
                        </div>
                        <div className="w-full">
                          <label className="mb-3 block text-black dark:text-white flex ">
                            Cost :{'  '}
                            <h3 className="text-xl font-bold ml-5">
                              {parseFloat(modalData['cost'] ?? 0).toFixed(2)}
                            </h3>
                          </label>
                        </div>
                        <div className="w-full">
                          <label className="mb-3 block text-black dark:text-white flex ">
                            Current Selling Price :{'  '}
                            <h3 className="text-xl font-bold ml-5">
                              {parseFloat(
                                modalData['selling_price'] ?? 0,
                              ).toFixed(2)}
                            </h3>
                          </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="w-full">
                            <label className="mb-3 block text-black dark:text-white">
                              Minimum margin
                            </label>
                            <div className="flex flex-row">
                              <input
                                type="number"
                                placeholder="0"
                                value={minMargin}
                                onChange={(e) => {
                                  setMinMargin(
                                    e.target.value as unknown as number,
                                  );
                                }}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              />
                              <span className="flex items-center pl-2 pr-5">
                                %
                              </span>
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="mb-3 block text-black dark:text-white">
                              Maximum margin
                            </label>
                            <div className="flex flex-row">
                              <input
                                type="number"
                                placeholder="0"
                                value={maxMargin}
                                onChange={(e) => {
                                  setMaxMargin(
                                    e.target.value as unknown as number,
                                  );
                                }}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              />
                              <span className="flex items-center pl-2 pr-5">
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <div className="w-full mt-5">
                          <label className="mb-3 block text-black dark:text-white">
                            Selling Price
                          </label>
                          <input
                            type="number"
                            placeholder="0.00"
                            onChange={(e) => {
                              setOptimumPrice(
                                e.target.value as unknown as number,
                              );
                            }}
                            value={optimumPrice}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div> */}
                        {/* <div className="w-full mt-5">
                            <div className="mb-6">
                                <CheckboxTwo
                                label="Update current price"
                                name="product2"
                                />
                            </div>
                            </div> */}
                        {/* {optimumPrice != -1 && (
                          <div className="w-full mt-3">
                            <label className="mb-3 block text-black dark:text-white flex ">
                              Optimum Selling Price :{'  '}
                              <h3 className="text-xl font-bold ml-5">
                                {optimumPrice == -1
                                  ? ''
                                  : parseFloat(optimumPrice ?? 0).toFixed(2)}
                              </h3>
                            </label>
                          </div>
                        )} */}
                        <div className="flex justify-between items-center mt-4">
                          <div className="w-full mt-3">
                            {optimumPrice != -1 && (
                              <label className="mb-3 block text-black dark:text-white flex ">
                                Optimum Selling Price :{'  '}
                                <h3 className="text-xl text-green font-bold ml-5">
                                  {optimumPrice == -1
                                    ? ''
                                    : parseFloat(optimumPrice ?? 0).toFixed(2)}
                                </h3>
                              </label>
                            )}
                          </div>
                          {/* <p className=" text-xl font-bold text-gray-500 line-through mr-2">
                            <span className="original-price">
                              {optimumPrice == modalData['selling_price']
                                ? ''
                                : parseFloat(
                                    modalData['selling_price'] ?? 0,
                                  ).toFixed(2)}
                            </span>
                          </p> */}
                          <div className="flex items-center">
                            <button
                              onClick={() => getOptimumPrice()}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                              Get Optimum Price
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
                    onClick={() => saveProduct(modalData['product_id'])}
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
