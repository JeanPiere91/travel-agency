import { Link, useLocation } from 'react-router-dom';


function Navigation() {
    const currentPage = useLocation().pathname;
    
    // function loginStatus() {
    //     if (Auth.loggedIn()) {
    //       return (
    //         <div>
    //           <ul>
    //             <li>
    //               <Link to='/Booking'>View Your Bookings</Link>
    //             </li>
    //             <li>
    //               <a href='/' onClick={() => Auth.logout()}>Logout</a>
    //             </li>
    //           </ul>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div>
    //           <ul>
    //             <li>
    //               <Link to='/signup'>Signup</Link>
    //             </li>
    //             <li>
    //               <Link to='/login'>Login</Link>
    //             </li>
    //           </ul>
    //         </div>
    //       );
    //     }  
    //   }

    return (
        <ul className="w-full flex items-center justify-around font-bold">
            <li >
                <Link
                    to="/"
                    // This is a conditional (ternary) operator that checks to see if the current page is "about"
                    className={currentPage === '/' ? 'text-white text-2xl font-semibold tracking-wider' : 'text-white text-2xl font-normal tracking-wider'}
                    >
                    Travel Logo
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
        {/* <li>
                <Link
                    to="/login"
                    // This is a conditional (ternary) operator that checks to see if the current page is "contact"
                    className={currentPage === '/login' ? 'text-blue-950 text-2xl font-semibold tracking-wider' : 'text-blue-950 text-2xl font-normal tracking-wider'}
                    >
                    Login
                </Link>
            </li>*/}
        </ul>
    );
}

export default Navigation;