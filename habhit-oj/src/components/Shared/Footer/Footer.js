import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-info py-5'>
            <div>
                copyright &copy; 2022 - {(new Date().getFullYear())} Nishat
            </div>
        </footer>
    );
};

export default Footer;