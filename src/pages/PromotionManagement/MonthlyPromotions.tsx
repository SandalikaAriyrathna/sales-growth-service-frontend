import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import ButtonView from '../../components/ButtonView';
// import ButtonDelete from '../../components/ButtonDelete';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import toast from 'react-hot-toast';

const MonthlyPromotions = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [discount, setDiscount] = useState('');
  const [headings] = useState([
    {
      title: 'Product ID',
      key: 'productId',
    },
    {
      title: 'Product Name',
      key: 'productName',
    },
    {
      title: 'Product Category',
      key: 'productCategory',
    },
    {
      title: 'Product Brand',
      key: 'productBrand',
    },
    {
      title: 'Product Department',
      key: 'productDepartment',
    },
    {
      title: 'Action',
      key: 'action',
    },
  ]);
  const [data, setData] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + 'promotion/predict-promotions');
      console.log('API Response:', response.data);

      const products = response.data.promotional_products.map((product: any) => {
        return {
          productId: product['product_id'],
          productName: product['product_name'],
          productCategory: product['product_category'],
          productBrand: product['product_Brand'],
          productDepartment: product['product_department'],
          action: (
            <div className="flex items-center space-x-3.5">
              <ButtonView
                onClick={() => generateImage(product)}
              />
              {/* <ButtonDelete onClick={() => console.log(product)} /> */}
            </div>
          ),
        };
      });
      console.log('Mapped Products:', products);
      setData(products);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch promotional products.');
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(event.target.value);
  };

  const handleSubmit = () => {
    // Logic for submitting the discount
    console.log('Submitted discount:', discount);
  };

  const generateImage = async (product: any) => {
    const prompt = `Create a realistic and visually appealing promotional banner featuring a ${product.product_Brand} ${product.product_name}. The banner should showcase the product prominently with modern and sophisticated
     design elements. Include a headline that says '${discount}% OFF' in bold and stylish typography, making it the focal point of the banner. The background should be elegant and complement the product,
     enhancing its features. Include subtle, tasteful decorations related to the product's category that do not overwhelm the main image. Aim for a clean, professional look that would attract customers in a retail setting`;
    const url = import.meta.env.VITE_OPEN_API_URL;
    const data = JSON.stringify({
      "model": "dall-e-3",
      "prompt": prompt,
      "n": 1,
      "size": "1024x1024"
    });

    console.log('Prompt:', prompt);
    console.log('Data:', data);

    const token = import.meta.env.VITE_OPEN_API_KEY;  // Correctly access the environment variable

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const imageUrl = response.data.data[0].url;
      console.log('Image URL:', imageUrl);
      setImageUrl(imageUrl);
      setShowModal(true);

      // Save the generated image URL to Firebase
      await saveImageToFirebase(product, imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image.');
    }
  };

  const saveImageToFirebase = async (product: any, imageUrl: string) => {
    try {
      await addDoc(collection(db, "promotional_images"), {
        productId: product.productId,
        productName: product.productName,
        productCategory: product.productCategory,
        productBrand: product.productBrand,
        productDepartment: product.productDepartment,
        imageUrl: imageUrl,
        createdAt: new Date(),
      });
      toast.success('Image saved to Firebase successfully.');
    } catch (error) {
      console.error('Error saving image to Firebase:', error);
      toast.error('Failed to save image to Firebase.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setImageUrl('');
  };

  return (
    <>
      <Breadcrumb pageName="Promotions" />
      
      {/* Section for Adding Discount */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-6">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Discount to Products
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Discount
              </label>
              <input
                type="text"
                placeholder="Add Discount"
                value={discount}
                onChange={handleDiscountChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <button 
              type="button" 
              onClick={handleSubmit}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      
      {/* Section for Selected Products for Promotions */}
      <div className="mt-6 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
  <div className="flex justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
    <h2 className="font-medium text-black dark:text-white">
      Selected Products for Promotions
    </h2>
    <button 
      type="button" 
      onClick={() => {/* Add functionality here */}}
      className="flex justify-center items-center rounded bg-primary p-3 font-medium text-gray"
    >
      {/* Replace with your desired button text */}
      Add Discounts
    </button>
  </div>
  <DataTable headings={headings} data={data} />
</div>

      {/* Modal for displaying generated image */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-2xl font-semibold">
                  Generated Promotion Image
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <img src={imageUrl} alt="Generated Promotion" className="w-full" />
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MonthlyPromotions;
