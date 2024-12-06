import {Link} from 'react-router-dom'

const Navbar = () => {

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className='nav-link'
                        to="/"
                    >
                        Sign out
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/home"
                    >
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link 
                        to="/profile"
                    >
                        Profile
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link 
                        to="/contribute"
                    >
                        Contribute
                    </Link>
                </li>
            </ul>
        </div>
    );
};


export default Navbar;