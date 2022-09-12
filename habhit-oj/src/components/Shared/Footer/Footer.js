import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-info py-5'>
            <div>
                copyright &copy; 2022 - {(new Date().getFullYear())}.&nbsp;
                <Link className='text-light text-decoration-none' to='/about'>Team_Penguins</Link>
            </div>
        </footer>
    );
};

export default Footer;