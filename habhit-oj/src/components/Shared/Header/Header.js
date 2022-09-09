import { signOut } from 'firebase/auth';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Header = () => {

    const [user, loading, error] = useAuthState(auth);

    // const [U, id] = [{}, ""];
    // if (user) {
    //     [U, id] = GetUser(user.email);
    // }

    const handleLogOut = () => {
        signOut(auth);
    }

    return (
        <Navbar className='sticky-top' collapseOnSelect expand="lg" bg="info" variant="dark">
            <Container>
                <Navbar.Brand href="/">HABHIT OJ</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/problems">Problems</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            user ?
                                <>
                                    <Nav.Link href="/user/:id">User</Nav.Link>
                                    <input onClick={handleLogOut} className='btn border-0' type="button" value="Log Out" />
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