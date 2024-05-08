
//Import UI component
import { Navigation } from './UI';

function Header() {
  return (
    <div>
      <nav className="flex justify-between items-center bg-blue-rgba  h-20 fixed inset-0 z-50">
        <Navigation/>
      </nav>
    </div>
  );
}

export default Header;