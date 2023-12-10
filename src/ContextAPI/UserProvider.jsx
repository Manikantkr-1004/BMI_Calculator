import React, { createContext, useState } from 'react'
import Cookies from "js-cookie"

export const UserAuth = createContext();

export function UserProvider({children}) {
    const [isAuth,setIsAuth] = useState(Cookies.get("bmi_auth") || false);
    const [user,setUser] = useState(Cookies.get("bmi_auth_user")?JSON.parse(Cookies.get("bmi_auth_user")):Cookies.get("bmi_auth_user") || []);

    const authSuccess = ()=>{
        Cookies.set("bmi_auth",true,{secure:true});
        setIsAuth(true);
        setTimeout(() => {
            Cookies.remove('bmi_auth')
            Cookies.remove('bmi_auth_user')
            window.location.reload()
        }, 15*60*1000);
    }

    const getUser = (payload)=>{
        Cookies.set("bmi_auth_user",JSON.stringify(payload),{secure:true});
        setUser(payload);
    }
    

    const logout = ()=>{
        Cookies.remove('bmi_auth')
        Cookies.remove('bmi_auth_user')
        window.location.reload();
    }

    return (
        <UserAuth.Provider value={{isAuth,user,authSuccess,getUser,logout}}>
            {children}
        </UserAuth.Provider>
    )
}
