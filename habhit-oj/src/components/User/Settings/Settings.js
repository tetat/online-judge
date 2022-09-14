import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import PageTitle from '../../hooks/PageTitle/PageTitle';
import useFetch from '../../hooks/useFetch/useFetch';

const Settings = () => {
    const [user] = useAuthState(auth);
    const users = useFetch('http://localhost:5000/users');

    const [added, setAdded] = useState(false);



    const handleUpdate = (event) => {
        event.preventDefault();

        const proceed = window.confirm('Are you sure, you want to update?');

        if (proceed) {
            const institute = event.target.institute.value;
            const address = event.target.address.value;

            const User = users?.find(u => u.email === user.email);

            fetch(`http://localhost:5000/users/${User._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    institute,
                    address,
                    Solved: User.Solved
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setAdded(true);
                })
        }

        event.target.reset();
    }

    return (
        <div
            style={{ width: "80%", margin: "0 auto", padding: "20px 0 180px 0", backgroundColor: "#f2f2f2" }}>
            <PageTitle title='Settings'></PageTitle>
            <h4 className='fst-italic'>Update your profile</h4>
            <hr />
            {
                added && <p>Profile updated successfully!</p>
            }
            <form onSubmit={handleUpdate} className='w-50 mx-auto pt-4'>
                <div style={{ textAlign: "left" }}>
                    <label
                        className='fs-5' htmlFor='institute'>Institute Name</label>
                    <input
                        id='institute'
                        className='w-100 p-2 mb-4'
                        type="text" name="institute"
                        placeholder="Haji Abul Hossain Institute of Technology" required />
                </div>
                <div style={{ textAlign: "left" }}>
                    <label className='fs-5' htmlFor='address'>Address</label>
                    <input
                        id='address'
                        className='w-100 p-2 mb-4'
                        type="text" name="address"
                        placeholder="Tangail, Bangladesh" required />
                </div>

                <input
                    className='text-white w-100 p-1 bg-primary border-0 rounded'
                    type="submit"
                    value="Update" />
            </form>
        </div>
    );
};

export default Settings;