import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch/useFetch';

const Problems = () => {
    const problems = useFetch('http://localhost:5000/problems');
    // problems.sort(function (a, b) {
    //     return a._id - b._id;
    // });
    const url = '/problems/';
    // console.log(problems);

    return (
        <div style={{ width: "80%", margin: "0 auto", backgroundColor: "#F0F8FF" }}>
            <h3 style={{ fontStyle: "italic" }} className='pt-4'>Problems</h3>
            <ol style={{ padding: "25px 0 340px 50px", margin: "0" }}>
                {
                    problems.map(prob => <li key={prob._id}
                        style={{ textAlign: "left" }}>
                        {/* <a href={url + prob._id} >{prob.problemName}</a> */}
                        <Link className="text-decoration-none" to={url + prob._id}>{prob.problemName}</Link>
                    </li>)
                }
            </ol>
        </div>
    );
};

export default Problems;