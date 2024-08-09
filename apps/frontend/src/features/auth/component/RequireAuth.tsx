import React, { useState } from "react";
import { useUser } from "../api/get-user";
import { Login } from "../../../pages/Login";
import { useAuthStore } from "../../../store/auth-store";

export const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) =>{
    const userQuery = useUser();
    const setIsLoggedIn = useAuthStore((state) => state.setLoggedIn)
    
    React.useEffect(() => {
        console.log("use effect", !!userQuery.data?.user)
        if (userQuery.data?.user){
        setIsLoggedIn(!!userQuery.data?.user)
    }
      }, [userQuery.data])
      
      const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
      console.log(isLoggedIn)
    if (!isLoggedIn){
        return (<Login />)
    }
    else{
        return children
    }
}