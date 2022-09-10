import React, { useState } from 'react';
import Axios from 'axios';

const SingleTest = (Input, Code, Lang) => {
    const [result, setResult] = useState({});

    Axios.post(`http://localhost:5000/compile`, {
        code: Code,
        language: Lang,
        input: Input
    }).then((res) => {
        setResult(res);
    })

    return result;
};

export default SingleTest;