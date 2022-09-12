import React from 'react';
import './About.css';

const About = () => {
    return (
        <div style={{ width: "80%", margin: "0 auto", padding: "20px 20px 200px 20px", backgroundColor: "#F0F8FF" }}>
            <h4>About Us</h4>
            <p style={{ textAlign: "left" }}>This Online Judge is created by Team_Penguins. Firstly we created this online judge on our academic project purpose. Our second target is to run this project for learning and practicing programming. Students from our Department can practice programming problem from here for sharp their brain! Our target is to keep update this project so, that it will more user friendly and programmer from our Department easily can learn and practice.</p>

            <div style={{ textAlign: "left" }}>
                <h5>Team_Penguins</h5>
                <ul className='listStyle'>
                    <li>
                        <a href='https://www.linkedin.com/in/tetat/' target='_blank'>Md. Nishat Miah</a>
                    </li>
                    <li>
                        <a href='https://www.facebook.com/profile.php?id=100010289832358' target='_blank'>Sanjida Nahar Eva</a>
                    </li>
                    <li>
                        <a href='https://www.facebook.com/arrafihossain.refat.5' target='_blank'>Ar Rafi Hossain Refat</a>
                    </li>
                    <li>
                        <a href='https://www.facebook.com/AbdurRhaman28' target='_blank'>Abdur Rahman</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default About;