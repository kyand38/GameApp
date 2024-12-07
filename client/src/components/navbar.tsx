import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {

    return (
        <div>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={Auth.logout}>
                        Sign out
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link'
                        to="/home"
                    >
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link'
                        to="/profile"
                    >
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contribute">
                        Contribute
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;