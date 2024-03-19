import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import ButtonView from '../../components/ButtonView';
import ButtonDelete from '../../components/ButtonDelete';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';

const Products = () => {
  const [headings, setHeadings] = useState([
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

  const [data, setData] = useState([
    {
      productName: 'Product 1',
      productCost: 100,
      maxProfitMargin: 20,
      minProfitMargin: 10,
      action: (
        <div className="flex items-center space-x-3.5">
          <ButtonView onClick={() => console.log('click')} />
          <ButtonDelete onClick={() => console.log('click')} />
        </div>
      ),
    },
    {
      productName: 'Product 2',
      productCost: 200,
      maxProfitMargin: 30,
      minProfitMargin: 15,
      action: (
        <div className="flex items-center space-x-3.5">
          <ButtonView onClick={() => console.log('click')} />
          <ButtonDelete onClick={() => console.log('click')} />
        </div>
      ),
    },
  ]);

  const getAllProducts = async () => {
    console.log(import.meta.env.VITE_API_URL);
    await axios
      .get(import.meta.env.VITE_API_URL + 'products')
      .then((response) => {
        const products = response.data.map((product: any) => {
          return {
            productName: product[2],
            productCost: product[],
            maxProfitMargin: product.maxProfitMargin,
            minProfitMargin: product.minProfitMargin,
            action: (
              <div className="flex items-center space-x-3.5">
                <ButtonView onClick={() => console.log('click')} />
                <ButtonDelete onClick={() => console.log('click')} />
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
    </>
  );
};

export default Products;
