import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import SingleObject from '../../hooks/SingleObject/SingleObject';
import Loading from '../../Shared/Loading/Loading';
import Login from '../../Login/Login/Login';


const Problem = () => {
    const [user] = useAuthState(auth);
    console.log(user);
    const problemId = useParams().probId;
    const url = `http://localhost:5000/problems/${problemId}`;
    const problem = SingleObject(url);
    // const Inputs = problem.sample.input;
    const Output = problem.hidden?.output;

    const [code, setCode] = useState(``);
    const [lang, setLang] = useState('cpp');
    const [output, setOutput] = useState('');
    const [Color, setColor] = useState('');
    const [loading, setLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const inputs = problem.sample?.input.split('\n');
    const outputs = problem.sample?.output.split('\n');
    console.log(inputs, outputs);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        if (!user) {
            return <Login></Login>
        }

        console.log(code, lang);
        if (code === ``) {
            return
        }

        if (accepted) {
            setAccepted(false);

        }

        Axios.post(`http://localhost:5000/compile`, {
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
                    setAccepted(true);
                }
                else {
                    setOutput("Wrong Answer!");
                    setColor('text-danger');
                    // setNext(false);
                }
            }
            else {
                setOutput(res.data.error);
                setColor('text-danger');
                // setNext(false);
            }
        }).then(() => {
            setLoading(false);
        })
    }

    return (
        <div>
            <div style={{ width: "80%", margin: "0 auto", padding: "30px 50px", backgroundColor: "#F0F8FF" }}>
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
            <div className='d-flex'
                style={{ width: "80%", margin: "0 auto", backgroundColor: "#F0F8FF", border: "1px solid black" }}>
                <div>
                    <textarea className='mt-3 ms-3' rows='20' cols='65'
                        value={code} onChange={(e) => setCode(e.target.value)}></textarea>

                    <div className='mb-4'>
                        <span className='border-0 rounded me-3 p-1 text-white bg-primary'>Select a language &nbsp;
                            <select className='border-0 rounded me-3'
                                value={lang} onChange={(e) => setLang(e.target.value)}>
                                <option value='cpp'>C++</option>
                                <option value='c'>C</option>
                                <option value='java'>Java</option>
                                <option value='py'>Python</option>
                            </select>
                        </span>
                        <button className='border-0 rounded text-white bg-primary' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className='p-4'>
                    {
                        loading ? <Loading></Loading> :
                            <p className={Color}>{output}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Problem;