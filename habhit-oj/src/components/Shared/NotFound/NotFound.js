import React from 'react';
import notFound from '../../../Images/Error-404.png';
import PageTitle from '../../hooks/PageTitle/PageTitle';

const NotFound = () => {
    return (
        <div>
            <PageTitle title="404"></PageTitle>
            <img src={notFound} alt='404 page not found' />
        </div>
    );
};

export default NotFound;