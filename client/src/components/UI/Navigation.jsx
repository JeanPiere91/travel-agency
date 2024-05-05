import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const currentPage = useLocation().pathname;
    
    return (
        <ul className="w-full flex items-center justify-around font-bold">
            <li >
                <Link
                    to="/"
                    // This is a conditional (ternary) operator that checks to see if the current page is "about"
                    className={currentPage === '/' ? 'text-blue-950 text-2xl font-semibold tracking-wider' : 'text-blue-950 text-2xl font-normal tracking-wider'}
                    >
                    Travel Logo
                </Link>
            </li>
            <li >
                <Link
                    to="/about"
                    // This is a conditional (ternary) operator that checks to see if the current page is "about"
                    className={currentPage === '/about' ? 'text-blue-950 text-2xl font-semibold tracking-wider' : 'text-blue-950 text-2xl font-normal tracking-wider'}
                    >
                    About Us
                </Link>
            </li>
            <li>
                <Link
                    to="/package"
                    // This is a conditional (ternary) operator that checks to see if the current page is "portfolio"
                    className={currentPage === '/portfolio' ? 'text-blue-950 text-2xl font-semibold tracking-wider' : 'text-blue-950 text-2xl font-normal tracking-wider'}
                    >
                    Packages
                </Link>
            </li>  
            <li>
                <Link
                    to="/contact"
                    // This is a conditional (ternary) operator that checks to see if the current page is "contact"
                    className={currentPage === '/contact' ? 'text-blue-950 text-2xl font-semibold tracking-wider' : 'text-blue-950 text-2xl font-normal tracking-wider'}
                    >
                    Contact
                </Link>
            </li> 
        </ul>
    );
}

export default Navigation;