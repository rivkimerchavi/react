import { Outlet } from "react-router"
import NavBar from "./NavBar"
import { createContext, useReducer } from "react";
import { User, userReducer } from "./User";
import HomePage from "./Home";
import Home from "./Home";

export type UserContextType = {
    user: User;
    userDispatch: React.Dispatch<any>;
};

export const UserContext = createContext<UserContextType | null>(null);

const AppLayout = () => {



    const initialUser: User = {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        addres: '',
        phone: ''
    };


  
    const [user, userDispatch] = useReducer(userReducer, initialUser)
    return (<>

        <UserContext.Provider value={{ user, userDispatch }}>

          <Home></Home>
            <NavBar />
         <Outlet/>
        </UserContext.Provider>

    </>)
}

export default AppLayout