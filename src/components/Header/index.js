import React from 'react';
import './index.css';

import {
    Link
} from 'react-router-dom';

import Logo from '../../Assets/pokemon-logo.png';

const Header = () => {
    return(
                            <header>
                    <Link to="/">
                        <img alt="logo" src={Logo} className="logo" />
                    </Link>
                </header>
    );
}

export default Header;