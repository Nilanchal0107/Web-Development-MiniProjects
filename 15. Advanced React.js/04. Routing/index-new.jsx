import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from "./pages/Host/HostVans"
import HostVanDetail from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"

import "./server"

const routesArray =  [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "vans", element: <Vans /> },
      { path: "vans/:id", element: <VanDetail /> },
      {
        path: "host",
        element: <HostLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "income", element: <Income /> },
          { path: "reviews", element: <Reviews /> },
          { path: "vans", element: <HostVans /> },
          {
            path: "vans/:id",
            element: <HostVanDetail />,
            children: [
              { index: true, element: <HostVanInfo /> },
              { path: "pricing", element: <HostVanPricing /> },
              { path: "photos", element: <HostVanPhotos /> }
            ]
          }
        ]
      },
      { path: "*", element: <NotFound /> }
    ]
  }
]

const router = createBrowserRouter(routesArray)


ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <RouterProvider router={router} />
  );