import SalesChart from './SalesForecastCharts.tsx';
import SalesbyProductCategory from './SalesbyProductCategory.tsx';

const FuturePredictionDashboard = () => {
  return (
    <>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <SalesChart />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <SalesbyProductCategory/> */}
      </div>
    </>
  );
};

export default FuturePredictionDashboard;




