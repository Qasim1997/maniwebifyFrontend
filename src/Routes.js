import React, { useState, useEffect } from 'react'
import { Navigate, useRoutes,Route } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Protected from './Protected'
import Signup from './pages/Auth/Signup';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Homepage from './pages/HomePage';
// ----------------------------------------------------------------------
// export default function Router() {

//   const routes = useRoutes([
//     {
//       path: '/dashboard',
//       element: <DashboardLayout />,
//       children: [
//         { element: <Navigate to="/dashboard/app" />, index: true },
//         { path: 'app', element: <DashboardAppPage /> },
//         { path: 'user', element: <UserPage /> },
//         { path: 'products', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//         { path: 'home', element: <Homepage /> },

//       ],
    
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       path: 'register',
//       element: <Signup/>,
//     },
//     {
//       path: 'forget_password',
//       element: <ForgetPassword/>,
//     },
//     {
//       path: 'api/admin/reset-password/reset/:token',
//       element: <ResetPassword/>,
//     },
   
//   {
//     element: <SimpleLayout />,
//     children: [
//       { element: <Navigate to="/dashboard/app" />, index: true },
//       { path: '404', element: <Page404 /> },
//       { path: '*', element: <Navigate to="/404" /> },
//     ],
//   },
//   {
//     path: '*',
//     element: <Navigate to="/404" replace />,
//   },


   
//   ]);

//   return routes;
// }


const Routes = () => {
  return (

   <Routes>
    <Route path="/login" element={<LoginPage />}/>
   {/* <Route path="/dashboard" element={<Protected/>} >
    <Route path="app" element={<DashboardAppPage/>} />
   </Route> */}
   </Routes>


  )
}

export default Routes