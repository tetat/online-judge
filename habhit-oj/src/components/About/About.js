import React from 'react';
import PageTitle from '../hooks/PageTitle/PageTitle';
import './About.css';

const About = () => {
    return (
        <div style={{ width: "80%", margin: "0 auto", padding: "20px 20px 200px 20px", backgroundColor: "#F0F8FF" }}>
            <PageTitle title="About"></PageTitle>
            <h4>About Us</h4>
            <p style={{ textAlign: "left" }}>This Online Judge is created by Md. Nishat Miah . Firstly, I created this online judge on my academic project purpose. Our second target is to run this project for learning and practicing programming. Students from our Department can practice programming problem from here for sharp their brain! My target is to keep update this project so, that it will be more user friendly and programmer from our Department easily can learn and practice.</p>

            <div style={{ textAlign: "left" }}>
                <h5>For learning the basics of C++ and Algorithms</h5>
                <ul className='listStyle'>
                    <li>
                        <a href='https://nishaternotes.blogspot.com/' target='_blank'>Visit Nishater Notes</a>
                    </li>
                </ul>
            </div>
            <div style={{ textAlign: "left" }}>
                <h5>Contact me on LinkedIn</h5>
                <ul className='listStyle'>
                    <li>
                        <a href='https://www.linkedin.com/in/tetat/' target='_blank'>Md. Nishat Miah</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default About;