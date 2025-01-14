import { act } from "react"

export type User=
{
    firstName:string
    lastName:string
    password:string
    email:string
    adress:string
    phone:string

}
 export type Action = {
    type: 'CREATE' | 'UPDATE'|'DELETE',
    data:User
}

export const  UserReducer = (state: User, action: Action)=>
{

    switch (action.type) {
        case 'CREATE':
            
            return{
        firstName:action.data.firstName,
        password:action.data.password,
        adress:' ',
        email:'',
        lastName:'',
        phone:''
    
      }
       case 'UPDATE':
        return{
       firstName:state.firstName,
         password:state.password,
         adress:action.data.adress,
         email:action.data.email,
         lastName:action.data.lastName,
         phone:action.data.phone,
        }
        default:
            return state
    }
}