import { Outlet } from "react-router"
import NavBar from "./NavBar";


const AppLayout = () => {
  
    return (<>
        <div style={{ border: '1px solid black' }}>
       
            <div style={{ border: '1px solid red' }}>
                <NavBar />
            </div>
            <div style={{ border: '1px solid blue' }}>
                <Outlet />
            </div>
         
        </div>
    </>)
}
export default AppLayout;