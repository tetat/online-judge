import { Link } from 'react-router-dom';
import PageTitle from '../hooks/PageTitle/PageTitle';
import useFetch from '../hooks/useFetch/useFetch';

const Users = () => {
    const users = useFetch('https://habhit-oj-server.herokuapp.com/users');
    // sort users decrease order by total problem solved 
    users.sort((a, b) => {
        return b.Solved.total.length - a.Solved.total.length;
    })
    const url = '/user/';

    return (
        <div style={{ width: "80%", margin: "0 auto", backgroundColor: "#f2f2f2" }}>
            <PageTitle title="Users"></PageTitle>
            <h3 style={{ fontStyle: "italic" }} className='pt-4'>Rank List</h3>
            <hr />
            <ol style={{ padding: "25px 0 340px 50px", margin: "0" }}>
                {
                    users.map(user =>
                        <li key={user._id}
                            className="fs-5"
                            style={{ textAlign: "left", margin: "6px 0" }}
                        >
                            <div>
                                <Link className="text-decoration-none" to={url + user._id}>{user.name}</Link>
                                <span>{" [Solved " + user.Solved.total.length + "]"}</span>
                            </div>
                            {/* <div>
                            <p>Solved: {user.Solved.length}</p>
                        </div> */}

                        </li>)
                }
            </ol>
        </div >
    );
};

export default Users;