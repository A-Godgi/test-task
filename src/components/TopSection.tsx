import React from 'react';

//Components
import Heading from "../UI/Heading";
import Text from "../UI/Text";
import Link from "../UI/Link";

//Service
import {scrollToSection} from "../services/scrollService";

const TopSection = () => {
    return (
        <section className='top-section'>
            <div className='top-section-content'>
                <Heading>Test assignment for front-end developer</Heading>
                <Text>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</Text>
                <div className='button-container'><Link href='#sign-up' onClick={() => scrollToSection('sign-up')}>SignUp</Link></div>
            </div>
        </section>
    );
};

export default TopSection;