import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Nav() {
    const location = useLocation();
    const [activePath, setActivePath] = useState('/');

    useEffect(() => { 
        setActivePath(location.pathname);
    }, [location]);

    return (
      <div>
        <nav>
            <Link className={activePath === '/' ? 'active' : ''} to='/'>Home</Link>
            <Link className={activePath === '/about' ? 'active' : ''} to='/about'>About</Link>
            <Link className={activePath === '/packages' ? 'active' : ''} to='/packages'>Packages</Link>
            <Link className={activePath === '/contact' ? 'active' : ''} to='/contact'>Contact</Link>
        </nav>
      </div>
    );
}

export default Nav;