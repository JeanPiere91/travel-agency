import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

// need to setup pages

const router= createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }, 
            {
                path: '/destination/:id',
                element: <Destination />
            },
            {
                path: '/tour/:id',
                element: <Tour />
            },
            {
                path: '/package/:id',
                element: <Package />
            },
            {
                path: '/booking',
                element: <Booking />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />  
);