import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

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
        <div className='my-4 py-5'>
            <h2 className='my-4'>Please Login</h2>
            <form onSubmit={handleLogIn} className='w-50 mx-auto'>
                <input
                    className='w-100 p-1 mb-4'
                    type="email" name="email"
                    placeholder="Enter Email" required />
                <input
                    className='w-100 p-1 mb-4'
                    type="password" name="password"
                    placeholder="Enter Password" required />

                <input
                    className='text-white w-100 p-1 bg-primary border-0 rounded'
                    type="submit"
                    value="Login" />
            </form>

            <p className='my-4'>
                <span className='me-2'>Don't have account?</span>
                <Link className='text-decoration-none text-warning' to="/register">Register</Link>
            </p>
            <p className='my-4'>
                <Link to="/forgetpassword" className='me-4 text-decoration-none text-warning'>Forget Password?</Link>
            </p>

        </div>
    );
};

export default Login;