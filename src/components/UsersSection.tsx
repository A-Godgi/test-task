import React, {useEffect, useState} from 'react';

//RTK Query
import {useGetUsersQuery} from "../store/api";

//Components
import UserCard from "../UI/UserCard";
import Heading from "../UI/Heading";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

//Tooltip
import {Tooltip} from "react-tooltip";

//Types
import {User} from "../types/users";

interface Props {
    setIsNewUser:  React.Dispatch<React.SetStateAction<boolean>>
    isNewUser: boolean
}

const UsersSection: React.FC<Props> = ({isNewUser, setIsNewUser}) => {
    //Current page state
    const [currentPage, setCurrentPage] = useState(1);

    //Displaying data
    const [users, setUsers] = useState<User[]>([])

    //RTK Query
    const {data = {page: 1, total_pages: null, users: []}, isFetching, isSuccess} = useGetUsersQuery({page: currentPage, count: 6});

    //Next page
    const handleShowMore = () => {
        setCurrentPage(currentPage + 1)
    }

    //Handle data
    useEffect(() => {
        if(!isFetching && isSuccess){
            if(isNewUser){
                setUsers(data.users);
                setIsNewUser(false)
            } else {
                setUsers((prevState) => [...prevState, ...data.users])
            }
        }
    },[isFetching, isSuccess])

    //Return to first page if new user added
    useEffect(() => {
        if(isNewUser){
            setCurrentPage(1)
        }
    },[isNewUser])

    return (
        <section id='users' className='users-section'>
            <Heading>Working with GET request</Heading>
            <div className='users-container'>
                {users.map((user) => <div id={user.id}><UserCard user={user}/></div>)}
            </div>
            <Tooltip place='bottom' disableStyleInjection={true} id='tooltip' className='tooltip' arrowColor='arrow'/>
            {data.page !== data.total_pages &&
                <div className='button-container'>
                    <Button
                        onClick={handleShowMore}
                        width='120px'
                        isDisabled={isFetching}
                    >
                        {isFetching ? <Spinner/> : 'Show more'}
                    </Button>
                </div>
            }
        </section>
    );
};

export default UsersSection;