import React from 'react';

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    fileName: string
    errorText?: string | string[]
    isError?: boolean
}

const UploadField: React.FC<Props> = ({
    onChange,
    fileName,
    isError,
    errorText
}) => {

    return (
        <label
            className={`upload ${isError ? 'upload-error' : ''}`}
            htmlFor="inputFile"
        >
            <div className='upload-button'>Upload</div>
            <input
                readOnly={true}
                placeholder='Upload your photo'
                value={fileName}
                className='upload-input'
            />
            <input
                accept="image/png, image/jpeg"
                onChange={onChange}
                id="inputFile"
                type="file"
            />
            <span className='error-text'>
                {typeof errorText === "string" ? errorText :
                    typeof errorText === "object" ? errorText[0] : ""
                }
            </span>
        </label>
    );
};

export default UploadField;