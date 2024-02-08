import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setLogOut } from "../redux/slices/users"

export default function JWTGuard({ children }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        const expired = localStorage.getItem("expired");
        const current = (Date.now() / 1000);

        if (!accessToken) {
            clearStorage()
        }

        if (current > expired) {
            clearStorage()
        }

    }, [])

    const clearStorage = () => {
        localStorage.clear();
        dispatch(setLogOut());
        navigate('/login')
    }

    return (
        <div>
            {children}
        </div>
    )
}
