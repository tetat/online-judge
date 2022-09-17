import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from '../../../firebase.init';
import PageTitle from '../../hooks/PageTitle/PageTitle';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [terms, setTerms] = useState(true);
    const [passMatch, setPassMatch] = useState(true);
    const [pass, setPass] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || '/';

    if (user) {
        navigate(from, { replace: true });
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,30}$/.test(password) === false) {
            setPass(true);
        }
        else if (password !== confirmPassword) {
            setPassMatch(false);
        }
        else {
            createUserWithEmailAndPassword(email, password);
            setPassMatch(true);
            setPass(false);
            setTerms(!terms);
            event.target.reset();
        }

        const user = {
            name,
            email,
            address: "",
            institute: "",
            Solved: {
                total: [],
                Submissions: []
            }
        };

        fetch(`https://habhit-oj-server.herokuapp.com/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    return (
        <div
            style={{ width: "80%", margin: "0 auto", padding: "30px 0 110px 0", backgroundColor: "#f2f2f2" }}>
            <PageTitle title="Register"></PageTitle>
            <h4 className='fst-italic text-success'>Register in HABHIT OJ</h4>
            <form onSubmit={handleSubmit} className='w-25 mx-auto'>
                <hr className='mb-4' />
                <input
                    className='w-100 p-2 mb-3'
                    type="text" name="name"
                    placeholder="Enter Name" required />
                <input
                    className='w-100 p-2 mb-3'
                    type="email" name="email"
                    placeholder="Enter Email" required />
                <input
                    className='w-100 p-2 mb-3'
                    type="password" name="password"
                    placeholder="Create Password" required />
                <input
                    className='w-100 p-2 mb-3'
                    type="password" name="confirmPassword"
                    placeholder="Confirm Password" required />

                {/* <div className='w-100 p-1 mb-2 text-start'>
                    <input onClick={() => setTerms(!terms)} type="checkbox" id="check" />
                    <label className={terms ? 'text-success' : 'text-danger'} htmlFor="check">&nbsp;&nbsp;Accept Terms & Conditions</label>
                </div> */}

                {
                    (passMatch === false || error) && <p className='text-danger'>Password did not match!!!</p>
                }
                {
                    error && <p className='text-danger'>{error.message}</p>
                }
                {
                    loading && <p>Loading...</p>
                }
                {
                    pass && <>
                        <p>Password length must be at least 8</p>
                        <p>Must be contain one lower case letter, one upper case letter and one digit</p>
                    </>
                }

                <input
                    className='text-white w-100 p-1 bg-primary border-0 rounded'
                    type="submit"
                    value="Register" disabled={!terms} />

            </form>
            <p className='my-3'>
                <span className='me-2'>Already have an account?</span>
                <Link className='text-decoration-none text-primary' to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;