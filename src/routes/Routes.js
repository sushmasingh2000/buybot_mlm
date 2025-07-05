// src/routes/routes.jsx
import Dashboard from '../dashboard/Dashboard';
import Activation from '../dashboard/pages/Activation';
import Fund from '../dashboard/pages/Fund/Fund';
import FundTransfer from '../dashboard/pages/Fund/Transfer';
import Direct from '../dashboard/pages/income/Direct';
import Level from '../dashboard/pages/income/Level';
import ROI from '../dashboard/pages/income/ROI';
import MainLayout from '../dashboard/pages/Layout/MainLayout';
import Profile from '../dashboard/pages/Profile';
import Wallet from '../dashboard/pages/Wallet';
import Withdrawal from '../dashboard/pages/Withdrawal';

export const routes = [
  {
    path: '/dashboard',
    element: ( <MainLayout><Dashboard /> </MainLayout>),
  },
  {
    path: '/fund',
    element: (<MainLayout><Fund /> </MainLayout>),
  },
   {
    path: '/income/level',
    element: (<MainLayout><Level /> </MainLayout>),
  },
   {
    path: '/income/roi',
    element: (<MainLayout><ROI /> </MainLayout>),
  },
   {
    path: '/income/direct',
    element: (<MainLayout><Direct /> </MainLayout>),
  },
   {
    path: '/activation',
    element: (<MainLayout><Activation /> </MainLayout>),
  },
  {
    path: '/wallet',
    element: (<MainLayout><Wallet /> </MainLayout>),
  },
   {
    path: '/profile',
    element: (<MainLayout><Profile /> </MainLayout>),
  },
   {
    path: '/withdrawal',
    element: (<MainLayout><Withdrawal /> </MainLayout>),
  },
   {
    path: '/fund-tranfer',
    element: (<MainLayout><FundTransfer /> </MainLayout>),
  },
  
];
