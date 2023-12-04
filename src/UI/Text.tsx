import React from 'react';

interface Props {
    children: string
    ref?: React.LegacyRef<HTMLParagraphElement>
}

const Text: React.FC<Props> = ({children, ref}) => {
    return (
        <p ref={ref} className='body'>{children}</p>
    );
};

export default Text;