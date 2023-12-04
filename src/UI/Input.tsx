import React from 'react';

interface Props {
    label: string
    value: string | undefined
    type: React.HTMLInputTypeAttribute
    onChange: React.ChangeEventHandler<HTMLInputElement>
    helperText?: string | string[]
    isError?: boolean
}

const Input: React.FC<Props> = ({
    label,
    value,
    type,
    onChange,
    helperText,
    isError
}) => {
    return (
        <div className="input-container">
            <input
                value={value}
                type={type}
                onChange={onChange}
                className={
                `input ${isError ? 'input-error' : ''}`
                }
                required
            />
            <label className='input-label'>
                {label}
            </label>
            <span className='helper-text'>
                {typeof helperText === "string" ? helperText :
                    typeof helperText === "object" ? helperText[0] : ""
                }
            </span>
        </div>
    );
};

export default Input;