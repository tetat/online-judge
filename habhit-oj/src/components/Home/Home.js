import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch/useFetch';

const Home = () => {
    const users = useFetch('https://habhit-oj-server.herokuapp.com/users');
    users.sort((a, b) => {
        return b.Solved.length - a.Solved.length;
    })
    const problems = useFetch('https://habhit-oj-server.herokuapp.com/problems');
    let usersLength = users.length;
    let problemsLength = problems.length;
    if (usersLength > 10) usersLength = 10;
    if (problemsLength > 10) problemsLength = 10;

    const urlu = '/user/';
    const urlp = '/problems/';

    return (
        <div style={{ width: "80%", margin: "0 auto", padding: "20px 20px 220px 20px", backgroundColor: "#f2f2f2" }}>
            <div>
                <h3>Welcome to <span className='fst-italic' style={{ color: "#191970" }}>HABHIT Online Judge</span></h3>
                <p>Learn with us and become <span className='fst-italic'>Great!</span></p>
            </div>

            <hr />

            <div className='d-flex justify-content-around mt-4'>
                <div>
                    <h4 className='fst-italic'>Users</h4>
                    <hr />
                    {
                        users?.slice(0, usersLength)?.map(user => <li key={user._id}
                            style={{ textAlign: "left", margin: "6px 0" }}>
                            {/* <a href={url + prob._id} >{prob.problemName}</a> */}
                            <Link className="text-decoration-none" to={urlu + user._id}>{user.name}</Link>
                            <span>{" [Solved " + user.Solved.total.length + "]"}</span>
                        </li>)
                    }
                </div>
                <div className='border-1'>
                    <h4 className='fst-italic'>Problems</h4>
                    <hr />
                    {
                        problems?.slice(0, problemsLength)?.map(prob => <li key={prob._id}
                            style={{ textAlign: "left", margin: "6px 0" }}>
                            {/* <a href={url + prob._id} >{prob.problemName}</a> */}
                            <Link className="text-decoration-none" to={urlp + prob._id}>{prob.problemName}</Link>
                        </li>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;