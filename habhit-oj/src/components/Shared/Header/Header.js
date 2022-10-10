import { signOut } from 'firebase/auth';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import useFetch from '../../hooks/useFetch/useFetch';
import './Header.css';

const Header = () => {

    const [user, loading, error] = useAuthState(auth);
    const users = useFetch('https://habhit-oj-server.herokuapp.com/users');
    const User = users?.find(u => u?.email === user?.email);

    const currentUserUrl = "/user/" + User?._id;


    // console.log(User);

    const handleLogOut = () => {
        signOut(auth);
    }

    return (
        <Navbar className='sticky-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className='fst-italic' href="/">HABHIT OJ</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/problems">Problems</Nav.Link>
                        <Nav.Link href="/users">Rank</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="https://nishaternotes.blogspot.com/">Nishater Notes</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            user ?
                                <>
                                    {user.email === 'nishat00101@gmail.com' && <Nav.Link href="/admin">Admin</Nav.Link>}
                                    <Nav.Link className='btn border-0 text-light Hover' href={currentUserUrl}>My Profile</Nav.Link>
                                    <input onClick={handleLogOut} className='btn border-0 text-light Hover' type="button" value="Log Out" />
                                </>
                                :
                                <>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;