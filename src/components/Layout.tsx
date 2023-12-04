import React from 'react';

//Image
import { ReactComponent as Logo } from '../assets/images/Logo.svg';

//Component
import Link from "../UI/Link";

//Service
import {scrollToSection} from "../services/scrollService";

interface Props {
    children: JSX.Element
}

const Layout: React.FC<Props> = ({children}) => {
    return (
        <div>
            <div className='header-container'>
                <header className='header'>
                    <Logo href='#' className='logo'/>
                    <nav className='header-button-group'>
                        <Link href='#users' onClick={() => scrollToSection('users')}>Users</Link>
                        <Link href='#sign-up' onClick={() => scrollToSection('sign-up')}>Sign Up</Link>
                    </nav>
                </header>
            </div>
            {children}
        </div>
    );
};

export default Layout;