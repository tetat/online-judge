import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SingleObject from '../hooks/SingleObject/SingleObject';
import pp from '../../Images/blank.jpg';
import PageTitle from '../hooks/PageTitle/PageTitle';

const User = () => {
    const userId = useParams().userId;
    const url = `https://habhit-oj-server.herokuapp.com/users/${userId}`;
    const user = SingleObject(url);

    // console.log(user);

    let sub = user?.Solved?.Submissions;
    let subr = [];
    for (let i = sub?.length - 1; i >= 0; i--) {
        subr.push(sub[i]);
    }
    // console.log(sub);

    let Institute = user.institute;
    if (Institute === '') Institute = 'None';
    let Address = user.address;
    if (Address === '') Address = 'None';

    return (
        <div style={{ width: "80%", margin: "0 auto", padding: "0 20px 0 20px", backgroundColor: "#f2f2f2" }}>
            <PageTitle title={`${user.name}`}></PageTitle>
            <div
                className='mt-0 mb-4'
                style={{ textAlign: "right" }}>
                <Link
                    className='text-decoration-none text-primary mt-0'
                    to='/settings'>Update</Link>
            </div>

            <div className='w-75 mx-auto border-1'>

                <div className='d-flex justify-content-between'>
                    <div style={{ textAlign: "left" }}>
                        <h5 className='mb-4'>Name: {user.name}</h5>
                        <p>Institution: {Institute}</p>
                        <p>From: {Address}</p>
                        <div>
                            {
                                "Solved: " + user.Solved?.total?.length + " Problems"
                            }
                        </div>
                    </div>
                    <div style={{ border: "1px solid black", height: "200px" }}>
                        <img width="100%" height="100%" src={pp} alt="Profile Picture" />
                    </div>
                </div>

                <p className='fs-4 fst-italic mt-5 pt-5'>Submissions</p>
                <div style={{ height: "500px" }} className='bg-white overflow-auto'>
                    <div class="container text-center">
                        <div className="row mb-2 py-2 bg-info">
                            <div className="col fs-5">
                                Name
                            </div>
                            <div className="col fs-5">
                                Time
                            </div>
                            <div className="col fs-5">
                                Verdict
                            </div>
                            <div className="col fs-5">
                                Language
                            </div>
                        </div>
                        {/* <hr /> */}
                        {
                            subr?.map(S => <div className="row py-1">
                                <div style={{ textAlign: "left" }} className="col ps-5">
                                    {S.prob}
                                </div>
                                <div className="col">
                                    {S.time}
                                </div>
                                <div className={"col " + S.color}>
                                    {S.verdict}
                                </div>
                                <div className="col">
                                    {S.lang}
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;