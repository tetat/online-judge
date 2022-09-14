import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import PageTitle from '../../../hooks/PageTitle/PageTitle';
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
        <div
            style={{ width: "80%", margin: "0 auto", padding: "100px 0", backgroundColor: "#f2f2f2" }}>
            <PageTitle title="Forget Password"></PageTitle>
            {
                sent ?
                    <div style={{ padding: "90px 0" }}>
                        <p className='fs-1'>Email has been sent</p>
                        <p className='fs-4'>Please check your inbox folder or spam folder.</p>
                    </div>
                    :
                    <>
                        <p className='fs-1'>To reset your password?</p>
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