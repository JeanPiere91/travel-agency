import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

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
                path: '/packages',
                element: <Packages />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />  
);