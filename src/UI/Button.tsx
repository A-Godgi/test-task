import React from 'react';

interface Props {
    children: string | JSX.Element
    isDisabled?: boolean
    width?: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<Props> = ({ children, isDisabled, width, onClick}) => {

    return (
        <button onClick={onClick} style={width ? {width} : undefined} disabled={isDisabled} className={`btn ${isDisabled ? 'btn-disabled' : ''}`}>
            {children}
        </button>
    );
};

export default Button;