import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function Header() {
  function loginStatus() {
    if (Auth.loggedIn()) {
      return (
        <div>
          <ul>
            <li>
              <Link to='/Booking'>View Your Bookings</Link>
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
              <Link to='/signup'>Signup</Link>
            </li>
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
      <header>
        <img src>Logo</img>
        <h1>
          <Link to='/'>
            Travel Agency
          </Link>
        </h1>

        <nav>
          {loginStatus()}
        </nav>
      </header>
    </div>
  );
}

export default Header;