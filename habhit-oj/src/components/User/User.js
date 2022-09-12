import React from 'react';
import { useParams } from 'react-router-dom';
import SingleObject from '../hooks/SingleObject/SingleObject';
import pp from '../../Images/blank.jpg';

const User = () => {
    const userId = useParams().userId;
    const url = `http://localhost:5000/users/${userId}`;
    const user = SingleObject(url);

    return (
        <div className='d-flex' style={{ width: "80%", margin: "0 auto", padding: "20px 20px 400px 20px", backgroundColor: "#F0F8FF" }}>
            <div style={{ textAlign: "left" }}>
                <h4>Name: {user.name}</h4>
                <div>
                    Solved Problems:&nbsp;
                    {
                        user?.Solved?.map(prob => prob[0] !== "" && <span>{"[" + prob[1] + "]"}&nbsp;</span>)
                    }
                </div>
            </div>
            <div style={{ margin: "0 0 0 400px", border: "1px solid black" }}>
                <img src={pp} alt="Profile Picture" />
            </div>
        </div>
    );
};

export default User;