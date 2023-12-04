import React from 'react';

interface Props {
    type?: 'primary'
    children: string
    href: string
    isDisabled?: boolean
    onClick: React.MouseEventHandler<HTMLAnchorElement>
}

const Link: React.FC<Props> = ({
        type,
        children,
        href,
        isDisabled,
        onClick
}) => {

    return (
        <a href={href} onClick={onClick} className={`btn ${isDisabled ? 'btn-disabled' : ''}`}>
            {children}
        </a>
    );
};

export default Link;