import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import SingleObject from '../../hooks/SingleObject/SingleObject';

const Problem = () => {
    const problemId = useParams().probId;
    const url = `http://localhost:5000/problems/${problemId}`;
    const problem = SingleObject(url);

    const [code, setCode] = useState(``);
    const [lang, setLang] = useState('cpp');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    // console.log(code, lang);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        console.log(code, lang);
        if (code === ``) {
            return
        }

        // Post request to compile endpoint
        Axios.post(`http://localhost:5000/compile`, {
            code: code,
            language: lang,
            input: problem.sample?.input[0]
        }).then((res) => {
            setOutput(res.data.output);
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
                        <p>{problem.sample?.input[0]}</p>
                    </p>
                    <p style={{ textAlign: "left" }}>
                        <p style={{ fontWeight: "bold" }}>Output:</p>
                        <p>{problem.sample?.output[0]}</p>
                    </p>
                </div>
            </div>
            <div className='d-flex' style={{ width: "80%", margin: "0 auto", backgroundColor: "#6495ED" }}>
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
                <div>
                    {output && <p>{output}</p>}
                </div>
            </div>
        </div>
    );
};

export default Problem;