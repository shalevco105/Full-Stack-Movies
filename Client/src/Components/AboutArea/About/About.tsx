import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useTitle } from '../../../Utils/UseTitle';
import SocialIcon from '../SocialIcon/SocialIcon';
import './About.css';
import { PageTitle } from '../../LayoutArea/PageTitle/PageTitle';

function About(): JSX.Element {
    useTitle("Shalev's Movies About");
    const currentYear = new Date().getFullYear();

    return (
        <div className="About">
            <PageTitle title="About Me" />
            <Card className="about-card">
                <CardContent>
                    <Typography variant="h5" component="div" className="about-title">
                        I Am Shalev Cohen
                    </Typography>
                    <Typography variant="body2" className="about-description">
                        <p>
                            {currentYear - 2002} years old, Full-Stuck developer with a strong foundation in Java, Node, typeScript, and React.</p>
                        <p>
                            Possessing {currentYear - 2021} years of experience as a full-Stuck developer in the IDF,
                            I had honed my skills in building scalable and user-centric web applications.
                        </p>
                        <p>
                            My expertise lies in collaborating with cross-functional teams to deliver high-quality software solutions.
                        </p>
                        <p>
                            I am committed to continuous learning and staying at the forefront of industry advancements.
                        </p>
                    </Typography>
                    <div className="social-icons">
                        <SocialIcon title="Facebook" link="https://www.facebook.com/profile.php?id=100001302181122" />
                        <SocialIcon title="LinkedIn" link="https://www.linkedin.com/in/shalev-cohen%F0%9F%87%AE%F0%9F%87%B1-a80b77232/" />
                        <SocialIcon title="Instagram" link="https://www.instagram.com/shalev.cohen1/" />
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

export default About;
