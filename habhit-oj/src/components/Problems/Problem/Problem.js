import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import SingleObject from '../../hooks/SingleObject/SingleObject';
import Loading from '../../Shared/Loading/Loading';
import Login from '../../Login/Login/Login';
import useFetch from '../../hooks/useFetch/useFetch';
import PageTitle from '../../hooks/PageTitle/PageTitle';


const Problem = () => {
    const [user] = useAuthState(auth);
    // console.log(user);
    const problemId = useParams().probId;
    const url = `https://habhit-oj-server.herokuapp.com/problems/${problemId}`;
    // get the problem that user wants
    const problem = SingleObject(url);
    // const Inputs = problem.sample.input;
    const Output = problem.hidden?.output;

    // get users
    const users = useFetch('https://habhit-oj-server.herokuapp.com/users');

    const [code, setCode] = useState(``);
    const [lang, setLang] = useState('cpp');
    const [output, setOutput] = useState('');
    const [Color, setColor] = useState('');
    const [size, setSize] = useState('fs-6');
    const [loading, setLoading] = useState(false);
    // const [accepted, setAccepted] = useState(false);

    const inputs = problem.sample?.input.split('\n');
    const outputs = problem.sample?.output.split('\n');
    // console.log(inputs, outputs);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        if (!user) {
            return <Login></Login>
        }

        // document.getElementById('submitbtn').disabled = false;
        Axios.post(`https://habhit-oj-server.herokuapp.com/compile`, {
            code: code,
            language: lang,
            input: problem.hidden?.input
        }).then((res) => {
            if (res.data.success === true) {
                // console.log(res.data.output + " A " + Output);
                // console.log(res.data.output.length + " Abc " + Output.length);
                if (res.data.output.slice(0, -1) === Output) {
                    // console.log(res.data.output + " Abc " + Output[i]);
                    setOutput("Accepted");
                    setColor('text-success');
                    setSize('fs-5')
                    saveTo("Accepted", new Date());
                }
                else {
                    setOutput("Wrong Answer!");
                    setSize('fs-5')
                    setColor('text-danger');
                    saveTo("Wrong Answer!", new Date());
                }
            }
            else {
                setOutput('Write valid code for this problem!!!');
                // console.log("ok:" + res.data.error)
                if (res.data.error !== undefined) {
                    setOutput(res.data.error);
                }
                setColor('text-danger');
                saveTo("Run Time Error!", new Date());
            }
        }).then(() => {
            setLoading(false);
        })

        const saveTo = (outp, curDate) => {
            // console.log(users);
            const User = users?.find(u => u.email === user.email);
            if (User) {
                const newId = User.Solved?.total.find(d => d === problemId);
                // console.log(newId);
                if (!newId && outp === "Accepted") {
                    User.Solved.total.push(problemId);
                }

                console.log(curDate);
                let dd = curDate.toLocaleString().split(' ');
                dd[0] = dd[0].slice(0, dd[0].length - 1);
                console.log(dd);
                let color = "text-success";
                if (outp !== "Accepted") {
                    color = "text-danger";
                }

                const rec = {
                    prob: problem.problemName,
                    time: dd[0],
                    lang,
                    verdict: outp,
                    color
                }

                User.Solved.Submissions.push(rec);

                fetch(`https://habhit-oj-server.herokuapp.com/users/${User._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        Solved: User.Solved
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            }
        }
    }

    return (
        <div>
            <PageTitle title={`${problem.problemName}`}></PageTitle>
            <div style={{ width: "80%", margin: "0 auto", padding: "30px 50px", backgroundColor: "#f2f2f2" }}>
                <h2>{problem.problemName}</h2>
                <p style={{ marginBottom: "0" }}><small>Time: {problem.time}</small></p>
                <p style={{ margin: "0" }}><small>Memory: {problem.memory}</small></p>
                <p style={{ marginTop: "25px", textAlign: "left" }}>{problem.description}</p>
                <p style={{ textAlign: "left" }}><span style={{ fontWeight: "bold" }}>Input:</span><br />{problem.input}</p>
                <p style={{ textAlign: "left" }}><span style={{ fontWeight: "bold" }}>Output:</span><br />{problem.output}</p>
                <p style={{ fontWeight: "bold", fontStyle: "italic" }}>Example</p>

                <div className='d-flex justify-content-around'>
                    <p style={{ textAlign: "left" }}>
                        <p style={{ fontWeight: "bold" }}>Input:</p>
                        {
                            inputs?.map((inp) =>
                                <p className='mb-0'>{inp}</p>
                            )
                        }
                    </p>
                    <p style={{ textAlign: "left" }}>
                        <p style={{ fontWeight: "bold" }}>Output:</p>
                        {
                            outputs?.map((out) =>
                                <p className='mb-0'>{out}</p>
                            )
                        }
                    </p>
                </div>
            </div>

            {/* edito */}
            <div
                style={{ width: "80%", margin: "0 auto", backgroundColor: "#f2f2f2", border: "1px solid black" }}>
                <div>
                    <p className='mt-3 mb-0 fw-bold fst-italic'>Editor</p>
                    <textarea className='w-75' rows="15"
                        value={code} onChange={(e) => setCode(e.target.value)}></textarea>

                    <div className='my-4'>
                        <span className='border-0 rounded me-3 p-2 text-white bg-primary'>Select a language &nbsp;
                            <select className='border-0 px-2 rounded me-3'
                                value={lang} onChange={(e) => setLang(e.target.value)}>
                                <option value='cpp'>C++</option>
                                <option value='c'>C</option>
                                <option value='java'>Java</option>
                                <option value='py'>Python</option>
                            </select>
                        </span>
                        <button
                            className='border-0 px-3 py-1 rounded text-white bg-primary'
                            onClick={handleSubmit} >Submit</button>
                    </div>
                </div>
                <div className='bg-white m-3 p-5'>
                    {
                        loading ? <Loading></Loading> :
                            <p style={{ textAlign: "left" }}>
                                <span className='fs-5 '>Status: </span>
                                <span className={Color + ' ' + size}>
                                    {
                                        output
                                    }</span>
                            </p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Problem;