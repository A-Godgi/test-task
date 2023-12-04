import React from 'react';
import { ReactComponent as Preloader } from '../assets/images/Preloader.svg';

const Spinner = () => {
    return (
        <Preloader className='spinner'/>
    );
};

export default Spinner;