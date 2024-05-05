//Import UI component
import { Navigation } from './UI';

const Header = () => {
    return (
        <div>
            <nav className="flex justify-between items-center bg-white/40 h-20 fixed inset-0">
                <Navigation/>
            </nav>
        </div>
        
    );
};

export default Header;