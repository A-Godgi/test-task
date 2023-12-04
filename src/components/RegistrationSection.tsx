import React, {useEffect, useState} from 'react';

//Components
import Heading from "../UI/Heading";
import Input from "../UI/Input";
import Text from "../UI/Text";
import UploadField from "../UI/UploadField";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

//RTK Query
import {useAddUserMutation, useGetPositionsQuery} from "../store/api";

//Image
import {ReactComponent as Success} from "../assets/images/success-image.svg";

interface Props {
    setIsNewUser:  React.Dispatch<React.SetStateAction<boolean>>
}

interface Errors {
    name?: string | string[]
    email?: string | string[]
    phone?: string | string[]
    position_id?: string | string[]
    photo?: string | string[]
}

const RegistrationSection: React.FC<Props> = ({setIsNewUser}) => {
    //Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState<null | number>(null);
    const [file, setFile] = useState<null|File>(null);
    const [fileName, setFileName] = useState('')
    const [errors, setErrors] = useState<Errors>({})

    //State checking fields until all errors are corrected
    const [isNeedCorrection, setIsNeedCorrection] = useState(false);

    //RTK Query
    const {data={positions:[]}} = useGetPositionsQuery();
    const [fetchAddUser,{isSuccess, isError, isLoading, error}] = useAddUserMutation();

    //Handle photo
    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files;

        if (file && file[0]) {
            setFileName(file[0].name)
            setFile(file[0]);
        }
    };

    //Checking fields until all errors are corrected
    useEffect(() => {
        if(isNeedCorrection){
            checkForm();
        }
    },[isNeedCorrection, name, phone, email, file])

    //Handle errors from server
    useEffect(() => {
        if(isError && error){
            console.error(error)
            // @ts-ignore
            if(error.data?.fails){
                // @ts-ignore
                setErrors(error.data.fails)
            }
            // @ts-ignore
            if(error.data?.message === "User with this phone or email already exist"){
                setErrors({
                    phone: "User with this phone or email already exist",
                    email: "User with this phone or email already exist"
                })
            }
        }
    },[isError, error])

    //Update data if a new user is added
    useEffect(() => {
        if(!isLoading && isSuccess){
            setIsNewUser(true)
        }
    },[isLoading, isSuccess, setIsNewUser])

    //Check form before request
    const checkForm = () => {
        let errors:Errors = {};
        const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        const phoneRegex = /^[\+]{0,1}380([0-9]{9})$/;
        if(name.length < 2 || name.length > 60){
            errors.name = 'Name should be 2-60 characters.'
        }
        if(!emailRegex.test(email)){
            errors.email = 'Enter valid email.'
        }
        if(!phoneRegex.test(phone)){
            errors.phone = 'Phone number should start with code of Ukraine +380 and length should be 12 numbers.'
        }
        if(file?.type !== 'image/jpeg' && file?.type !== 'image/jpg'){
            errors.photo = 'Photo should be jpg/jpeg image.'
        }
        if(!file || file.size > 5242880){
            errors.photo = 'Photo size should not exceed 5MB.'
        }
        setErrors(errors)
        if(Object.keys(errors).length === 0){
            isNeedCorrection && setIsNeedCorrection(false)
            return true
        } else {
            !isNeedCorrection && setIsNeedCorrection(true)
            return false
        }
    }

    return (
        <section id='sign-up' className='registration-section'>
            <Heading>{isSuccess ? 'User successfully registered' : 'Working with POST request'}</Heading>
            {isSuccess ? <Success/> :
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input
                        label='Your name'
                        type='text'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        isError={'name' in errors}
                        helperText={errors.name}
                    />
                    <Input
                        label='Email'
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        isError={'email' in errors}
                        helperText={errors.email}
                    />
                    <Input
                        label='Phone'
                        type='text'
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        helperText={errors.phone ?? '+38 (XXX) XXX - XX - XX'}
                        isError={'phone' in errors}
                    />
                    <Text>Select your position</Text>
                    {data.positions.map((item) => (
                        <div id={`${item.id}`} className='radio-container'>
                            <input onChange={(event) => setPosition(+event.target.value)} className='radio' type="radio"
                                   id={`radio${item.id}`} name='positions' value={item.id}/>
                            <label htmlFor={item.name}>{item.name}</label>
                        </div>
                    ))}
                    <UploadField
                        onChange={handleFileChange}
                        fileName={fileName}
                        isError={'photo' in errors}
                        errorText={errors.photo}
                    />
                    <div className='button-container'>
                        <Button
                            isDisabled={
                                name.length === 0 ||
                                email.length === 0 ||
                                phone.length === 0 ||
                                position === null ||
                                file === null
                            }
                            onClick={() => {
                                if (checkForm() && file && position) {
                                    fetchAddUser(
                                        {name, email, phone, position_id: position, photo: file}
                                    )
                                }
                            }}
                        >
                            {isLoading ? <Spinner/> : 'Sign up'}
                        </Button>
                    </div>
                </form>
            }
        </section>
    );
};

export default RegistrationSection;