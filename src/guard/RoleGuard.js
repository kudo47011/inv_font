import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import permission from "../context/permission.json"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

export default function RoleGuard({ children }) {
    const { users } = useSelector((state) => state.users);
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const findPermission = permission?.find(item => {
            let findRole = item?.role.find((element) => element == users?.role)
            return findRole
        })

        if (!findPermission) {
            navigate('/login')
        }


    }, [])

    return (
        <div>
            {children}
        </div>
    )
}
