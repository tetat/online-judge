import React, { useState } from 'react';
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import PageTitle from '../../hooks/PageTitle/PageTitle';

const VerifyEmail = () => {
    const [sent, setSent] = useState(false);

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
        <div className='w-50' style={{ margin: "250px auto" }}>
            <PageTitle title="Email Verify"></PageTitle>
            {
                !sent ? <>
                    <p className='fs-4'>Please sent verification link and verify your email</p>
                    <button className='border-0 rounded px-3 py-1 text-white bg-primary'
                        onClick={async () => {
                            await sendEmailVerification();
                            setSent(true);
                        }}
                    >
                        Sent Link
                    </button>
                </>
                    :
                    <>
                        <p className='fs-4'>Verification link has been sent to your email. check your inbox and if not found also check spam folder.</p>
                        <button className='border-0 rounded px-3 py-1 text-white bg-primary'
                            onClick={async () => {
                                await sendEmailVerification();
                                setSent(true);
                            }}
                        >
                            Sent Again
                        </button>
                    </>
            }

        </div>
    );
};

export default VerifyEmail;