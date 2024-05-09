import { Link, useLocation } from 'react-router-dom';
import Auth from "../../utils/auth";

function Navigation() {
    const currentPage = useLocation().pathname;

    function showNavigation() {
        if (Auth.loggedIn()) {
          return (
            <li>
                <Link
                    // This is a conditional (ternary) operator that checks to see if the current page is "contact"
                    className='text-white text-2xl font-normal tracking-wider'
                    onClick={() => Auth.logout()}
                    >
                    Logout
                </Link>
            </li>
          );
        } else {
          return (
            <li>
                <Link
                    to="/login"
                    // This is a conditional (ternary) operator that checks to see if the current page is "contact"
                    className={currentPage === '/login' ? 'text-white text-2xl font-semibold tracking-wider' : 'text-white text-2xl font-normal tracking-wider'}
                    >
                    Login
                </Link>
            </li>
          );
        }
      }
      
    return (
        <ul className="w-full flex items-center justify-around font-bold">
            <li >
                <Link
                    to="/"
                    // This is a conditional (ternary) operator that checks to see if the current page is "about"
                    className={currentPage === '/' ? 'text-white text-2xl font-semibold tracking-wider' : 'text-white text-2xl font-normal tracking-wider'}
                    >
                    Awesome Travel Agency
                </Link>
            </li>
            <li >
                <Link
                    to="/about"
                    // This is a conditional (ternary) operator that checks to see if the current page is "about"
                    className={currentPage === '/about' ? 'text-white text-2xl font-semibold tracking-wider' : 'text-white text-2xl font-normal tracking-wider'}
                    >
                    About Us
                </Link>
            </li>
            <li>
                <Link
                    to="/package"
                    // This is a conditional (ternary) operator that checks to see if the current page is "portfolio"
                    className={currentPage === '/package' ? 'text-white text-2xl font-semibold tracking-wider' : 'text-white text-2xl font-normal tracking-wider'}
                    >
                    Packages
                </Link>
            </li>  
            <li>
                <Link
                    to="/contact"
                    // This is a conditional (ternary) operator that checks to see if the current page is "contact"
                    className={currentPage === '/contact' ? 'text-white text-2xl font-semibold tracking-wider' : 'text-white text-2xl font-normal tracking-wider'}
                    >
                    Contact
                </Link>
            </li>
            {showNavigation()}
        </ul>
    );
}

export default Navigation;