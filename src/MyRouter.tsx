import { createBrowserRouter } from "react-router-dom";
import UpDate from "./components/UpDate";
import AllRecipes from "./components/AllRecipes";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import UpdateRecipe from "./components/UpdateRecipe";

export const MyRouter =  createBrowserRouter([
   {
       path: '/',
       element: <AppLayout  />, // העברת מצב הכניסה
       errorElement: <>error element</>,
       children: [
          
           
           
                   { path: 'AllRecipes', element: <AllRecipes /> }
                   ,
           {
            path: 'Addrecipe', element: <AddRecipe />
        },
        {
            path: 'UpdateRecipe', element: <UpdateRecipe />
        },
               ]
           }
        
    
       
   
]);