
//Import UI component
import { Navigation } from './UI';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function Header() {
  function loginStatus() {
    if (Auth.loggedIn()) {
      return (
        <div>
          <ul>
            <li>
              <Link to='/Booking'>Bookings</Link>
            </li>
            <li>
              <a href='/' onClick={() => Auth.logout()}>Logout</a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <ul>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      );
    }  
  }

  return (
    <div>
      <nav className="flex justify-between items-center bg-white/40 h-20 fixed inset-0">
              <Navigation/>
              {loginStatus()}
      </nav>
    </div>
  );
}

export default Header;