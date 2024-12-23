import React from 'react';
import style from '../styles/GlassButton.module.css';

interface GlassButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const GlassButton: React.FC<GlassButtonProps> = ({ children, onClick }) => {

    return (
        <button className={style.glassButton} onClick={onClick}>
            {children}
        </button>
    );
};

export default GlassButton;