import React from 'react';
import SalesChart from './SalesForecastCharts.tsx';
import SalesTrends from './SalesTrends.tsx';
// import SalesbyProductCategory from './SalesbyProductCategory.tsx';
import SeasonalDecomposition from './SeasonalDecomposition.tsx';

const FuturePredictionDashboard = () => {
  return (
    <>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <SalesChart />
      </div>
      <br/>
      <br/>
      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <SalesbyProductCategory/>
      </div> */}
      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"> */}
      <SalesTrends />
      <br/>
      <br/>
      <SeasonalDecomposition />
      {/* </div> */}
    </>
  );
};

export default FuturePredictionDashboard;




