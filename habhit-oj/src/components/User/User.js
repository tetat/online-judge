import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SingleObject from '../hooks/SingleObject/SingleObject';
import pp from '../../Images/blank.jpg';
import PageTitle from '../hooks/PageTitle/PageTitle';

const User = () => {
    const userId = useParams().userId;
    const url = `http://localhost:5000/users/${userId}`;
    const user = SingleObject(url);

    let Institute = user.institute;
    if (Institute === '') Institute = 'None';
    let Address = user.address;
    if (Address === '') Address = 'None';

    return (
        <div style={{ width: "80%", margin: "0 auto", padding: "0 20px 410px 20px", backgroundColor: "#f2f2f2" }}>
            <PageTitle title={`${user.name}`}></PageTitle>
            <div
                className='mt-0 mb-4'
                style={{ textAlign: "right" }}>
                <Link
                    className='text-decoration-none text-primary mt-0'
                    to='/settings'>Settings</Link>
            </div>

            <div className='w-75 mx-auto border-1'>

                <div className='d-flex justify-content-between'>
                    <div style={{ textAlign: "left" }}>
                        <h5 className='mb-4'>Name: {user.name}</h5>
                        <p>Institution: {Institute}</p>
                        <p>From: {Address}</p>
                        <div>
                            Solved Problems:&nbsp;
                            {
                                user?.Solved?.map(prob => prob[0] !== "" && <span>{"[" + prob[1] + "]"}&nbsp;</span>)
                            }
                        </div>
                    </div>
                    <div style={{ border: "1px solid black", height: "200px" }}>
                        <img width="100%" height="100%" src={pp} alt="Profile Picture" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;