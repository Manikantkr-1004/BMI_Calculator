import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Home} from "../Pages/Home"
import {Login} from "../Pages/Login"
import {Signup} from "../Pages/Signup"
import {Profile} from "../Pages/Profile"
import {History} from "../Pages/History"
import { PrivateRoutes } from './PrivateRoutes'

export function AllRoutes() {
    

    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/profile' element={<PrivateRoutes><Profile /></PrivateRoutes>}></Route>
            <Route path='/history' element={<PrivateRoutes><History /></PrivateRoutes>}></Route>
            <Route path='*' element={<h1>404 Error || Not Found Page</h1>}></Route>
        </Routes>
    )
}
