import React, {useEffect, useRef, useState} from 'react';
import {User} from "../types/users";
import {ReactComponent as Cover} from "../assets/images/photo-cover.svg";

interface Props {
    user: User
}

const UserCard: React.FC<Props> = ({user}) => {
    const {id, name, position, email, phone, photo} = user;
    //Refs for check width
    const cardRef = useRef<HTMLDivElement | null>(null);
    const nameRef = useRef<HTMLParagraphElement | null>(null);
    const positionRef = useRef<HTMLParagraphElement | null>(null);
    const emailRef = useRef<HTMLParagraphElement | null>(null);
    const phoneRef = useRef<HTMLParagraphElement | null>(null);

    //Elements whose width exceeds the width of the Card
    const [tooLongTexts, setTooLongTexts] = useState<string[]>([]);

    //Error Photo state
    const [isPhotoError, setIsPhotoError] = useState(false);

    const cardPadding = 39;

    //Search elements whose width exceeds the width of the Card
    const checkTextsLongerThanCard = () => {
        if(
            cardRef.current &&
            nameRef.current &&
            positionRef.current &&
            emailRef.current &&
            phoneRef.current
        ){
            const textsArray = []
            const cardWidth = cardRef.current?.getBoundingClientRect().width - cardPadding;
            if(cardWidth < nameRef.current?.scrollWidth){
                textsArray.push('name')
            }
            if(cardWidth < positionRef.current?.scrollWidth){
                textsArray.push('position')
            }
            if(cardWidth < emailRef.current?.scrollWidth){
                textsArray.push('email')
            }
            if(cardWidth < phoneRef.current?.scrollWidth){
                textsArray.push('phone')
            }
            setTooLongTexts(textsArray)

        }
    }

    useEffect(() => {
        checkTextsLongerThanCard();
    },[cardRef, nameRef, positionRef, emailRef, phoneRef])

    return (
        <div ref={cardRef} id={id} className='user-card'>
            {isPhotoError ? <Cover className='avatar' /> :
                <img
                    alt='avatar'
                    className='avatar'
                    src={photo}
                    onError={() => {
                        setIsPhotoError(true)
                    }}
                />}
            <p
                ref={nameRef}
                className='body'
                style={tooLongTexts.includes('name') ? {cursor: 'pointer'} : undefined}
                data-tooltip-id={tooLongTexts.includes('name') ? 'tooltip' : undefined}
                data-tooltip-content={tooLongTexts.includes('name') ? name : null}
            >
                {name}
            </p>
            <p
                ref={positionRef}
                className='body'
                style={tooLongTexts.includes('position') ? {cursor: 'pointer'} : undefined}
                data-tooltip-id={tooLongTexts.includes('position') ? 'tooltip' : undefined}
                data-tooltip-content={tooLongTexts.includes('position') ? position : null}
            >
                {position}
            </p>
            <p
                ref={emailRef}
                className='body'
                style={tooLongTexts.includes('email') ? {cursor: 'pointer'} : undefined}
                data-tooltip-id={tooLongTexts.includes('email') ? 'tooltip' : undefined}
                data-tooltip-content={tooLongTexts.includes('email') ? email : null}
            >
                {email}
            </p>
            <p
                ref={phoneRef}
                style={tooLongTexts.includes('phone') ? {cursor: 'pointer'} : undefined}
                className='body'
                data-tooltip-id={tooLongTexts.includes('phone') ? 'tooltip' : undefined}
                data-tooltip-content={tooLongTexts.includes('phone') ? phone : null}
            >
                {phone}
            </p>
        </div>
    );
};

export default UserCard;