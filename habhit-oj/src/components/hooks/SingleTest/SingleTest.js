import React, { useState } from 'react';
import Axios from 'axios';

const SingleTest = (Input, Code, Lang) => {
    const [result, setResult] = useState({});

    Axios.post(`https://habhit-oj-server.herokuapp.com/compile`, {
        code: Code,
        language: Lang,
        input: Input
    }).then((res) => {
        setResult(res);
    })

    return result;
};

export default SingleTest;