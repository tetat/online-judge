import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch/useFetch';

const Users = () => {
    const users = useFetch('http://localhost:5000/users');
    // console.log(users);
    const url = '/user/';

    return (
        <div style={{ width: "80%", margin: "0 auto", backgroundColor: "#F0F8FF" }}>
            <h3 style={{ fontStyle: "italic" }} className='pt-4'>Users</h3>
            <ol style={{ padding: "25px 0 340px 50px", margin: "0" }}>
                {
                    users.map(user => <li key={user._id}
                        style={{ textAlign: "left" }}>
                        {/* <a href={url + prob._id} >{prob.problemName}</a> */}
                        <Link className="text-decoration-none" to={url + user._id}>{user.name}</Link>
                    </li>)
                }
            </ol>
        </div>
    );
};

export default Users;