import React, {useState} from 'react';

//Comopnents
import TopSection from "../components/TopSection";
import UsersSection from "../components/UsersSection";
import RegistrationSection from "../components/RegistrationSection";

const HomePage = () => {
    //Update users state
    const [isNewUser, setIsNewUser] = useState(false);

    return (
        <main>
            <TopSection/>
            <UsersSection isNewUser={isNewUser} setIsNewUser={setIsNewUser}/>
            <RegistrationSection setIsNewUser={setIsNewUser}/>
        </main>
    );
};

export default HomePage;