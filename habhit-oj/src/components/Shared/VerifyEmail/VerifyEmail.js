import React, { useState } from 'react';
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');

    const [sendEmailVerification, sending, error] = useSendEmailVerification(
        auth
    );


    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (sending) {
        return <p style={{ margin: "240px auto" }}>Sending...</p>;
    }
    return (
        <div style={{ margin: "200px auto" }}>
            <p className='fs-4'>Please sent verification link and verify your email</p>
            <button className='border-0 rounded px-3 py-1 text-white bg-primary'
                onClick={async () => {
                    await sendEmailVerification();
                    alert('Verification link has been sent to your email. check inbox or spam folder to verify');
                }}
            >
                Sent Link
            </button>
        </div>
    );
};

export default VerifyEmail;