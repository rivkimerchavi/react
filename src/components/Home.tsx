
import React, { createContext, useContext, useReducer, useState, Dispatch } from "react";
import { Action, User, UserReducer } from "./User";
import LogIn from "./LogIn";
import UpDate from "./UpDate";
import Avatar from "./Avatar";
import Avatar1 from "./Avatar";
import LogUp from "./LogUp";

// Define the context type
export type UseContextType = {
    user: User;
    userDispatch: Dispatch<Action>; // Ensure Action type is correctly defined
};


export const userId = createContext<{ id: string; setid: Dispatch<React.SetStateAction<string>> } | null>(null);

// Create context
export const userContext = createContext<UseContextType | null>(null);

const Home = () => {
    const init: User = {
        firstName: 'rivki',
        password: '123',
        adress: '', // Fixed spelling from 'adress' to 'address'
        email: '',
        lastName: '',
        phone: '',
    };

    const [login, setLogin] = useState(false);
    const [user, userDispatch] = useReducer(UserReducer, init);
    const[id,setid]=useState(" ")
    const handOnLogIn = () => {
        setLogin(true);
    };

    return (
        <>

            <userContext.Provider value={{ user, userDispatch }}>
            <userId.Provider value={{id,setid}}>
            {login===false&&<LogIn OnLogIn= {handOnLogIn}/>}
            {login===false&&<LogUp OnLogIn= {handOnLogIn}/>}
            {login&&<UpDate/>}
            {login&&<Avatar1/>}
             </userId.Provider>
            </userContext.Provider>
    
            {/* {user.adress}
            {user.phone} */}
        </>
    );
}

export default Home;
