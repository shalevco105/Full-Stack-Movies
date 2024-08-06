import React from 'react';
import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import './SocialIcon.css';

interface SocialIconProps {
    title: string;
    link: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ title, link }) => {
    const renderIcon = () => {
        switch (title) {
            case 'Facebook':
                return <FacebookIcon className="social-icon" />;
            case 'LinkedIn':
                return <LinkedInIcon className="social-icon" />;
            case 'Instagram':
                return <InstagramIcon className="social-icon" />;
            default:
                return null;
        }
    };

    return (
        <IconButton
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={title}
            className="social-icon-button"
        >
            {renderIcon()}
        </IconButton>
    );
};

export default SocialIcon;
