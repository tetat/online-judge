import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-dark py-5'>
            <div className='text-white'>
                copyright &copy; 2022 - {(new Date().getFullYear())}.&nbsp;
                <Link className='text-light text-decoration-none' to='/about'>Team_Penguins</Link>
            </div>
        </footer>
    );
};

export default Footer;