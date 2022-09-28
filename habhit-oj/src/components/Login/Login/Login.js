import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import PageTitle from '../../hooks/PageTitle/PageTitle';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // if user exist, don't need to login or register
    if (user) {
        console.log(user);
        navigate(from, { replace: true });
    }


    const handleLogIn = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        await signInWithEmailAndPassword(email, password);
    }

    return (
        <div
            style={{ width: "80%", margin: "0 auto", padding: "30px 0 0 0", backgroundColor: "#f2f2f2", height: "550px" }}>
            <PageTitle title="Login"></PageTitle>
            <h4 className='fst-italic text-success'>Login to HABHIT OJ</h4>
            <form onSubmit={handleLogIn} className='w-25 mx-auto'>
                <hr className='mb-4' />
                <input
                    className='w-100 p-2 mb-4'
                    type="email" name="email"
                    placeholder="Enter Email" required />
                <input
                    className='w-100 p-2 mb-4'
                    type="password" name="password"
                    placeholder="Enter Password" required />

                {
                    error && <p className='text-danger'>{error.message}</p>
                }
                {
                    loading && <p>Loading...</p>
                }

                <input
                    className='text-white w-100 p-1 bg-primary border-0 rounded'
                    type="submit"
                    value="Login" />
            </form>

            <p className='my-4'>
                <span className='me-2'>Don't have account?</span>
                <Link className='text-decoration-none text-primary' to="/register">Register</Link>
            </p>
            <p className='my-4'>
                Forget Password?&nbsp;
                <Link to="/forgetpassword" className='text-decoration-none text-warning'>Click here</Link>
            </p>

        </div>
    );
};

export default Login;