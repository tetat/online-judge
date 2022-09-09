import React from 'react';
import notFound from '../../../Images/Error-404.png';

const NotFound = () => {
    return (
        <div>
            <img src={notFound} alt='404 page not found' />
        </div>
    );
};

export default NotFound;