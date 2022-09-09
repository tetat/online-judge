import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';

const ForgetPassword = () => {
    const [sent, setSent] = useState(false);

    const [
        sendPasswordResetEmail,
        sending,
        Ferror
    ] = useSendPasswordResetEmail(auth);

    if (sending) {
        return <Loading></Loading>
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        setSent(true);
        await sendPasswordResetEmail(email);
    }
    return (
        <div style={{ margin: `0 0 ${sent ? '300px' : '190px'} 0` }}>
            {
                sent ?
                    <>
                        <p style={{ margin: '150px 0 0 0' }} className='fs-1'>Email has been sent</p>
                        <p className='fs-4'>Please check your inbox folder or spam folder.</p>
                    </>
                    :
                    <>
                        <p className='fs-1 mt-5'>To reset your password?</p>
                        <p className='fs-3'>Please type your email and click reset email.</p>
                        <form onSubmit={handleSubmit} className='w-50 my-4 mx-auto'>
                            <input
                                className='w-100 p-1 my-5'
                                type="email" name="email"
                                placeholder="Enter Email" required />

                            <input
                                className='text-white w-100 p-1 bg-primary border-0 rounded'
                                type="submit"
                                value="Sent Password Reset Email" />
                        </form>
                    </>
            }

        </div>
    );
};

export default ForgetPassword;