import { lazy } from 'react';
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const RecommendationDashboard = lazy(() => import('../pages/Admin-Recommendation/RecommendationDashboard'));
const FuturePredictionDashboard = lazy(() => import('../pages/Admin-SalesForecasting/FuturePredictionDashboard'));
const SalesbyProductCategory = lazy(() => import('../pages/Admin-SalesForecasting/SalesbyProductCategory'));


const MonthlyPromotions = lazy(() => import('../pages/PromotionManagement/MonthlyPromotions'));

const DataStock = lazy(() => import('../pages/DataStock/DataStock'));
const PriceOptimizationConfig = lazy(
  () => import('../pages/PriceOptimization/PriceOptimizationConfig'),
);
const Products = lazy(() => import('../pages/Common/Products'));



const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/recommendations',
    title: 'Recommendations',
    component: RecommendationDashboard,
  },
  {
    path: '/forecast',
    title: 'FuturePredictionDashboard',
    component: FuturePredictionDashboard,
  },
  {
    path: '/SalesbyProductCategory',
    title: 'SalesbyProductCategory',
    component: SalesbyProductCategory,
  },
  {
    path: '/data-stock',
    title: 'Data Stock',
    component: DataStock,
  },
  {
    path: '/price',
    title: 'Price Optimization',
    component: PriceOptimizationConfig,
  },
  {
    path: '/products',
    title: 'Products',
    component: Products,
  },
  {
    path: '/monthlyPromotions',
    title: 'Monthly Promotions',
    component: MonthlyPromotions,
  },
];

const routes = [...coreRoutes];
export default routes;
