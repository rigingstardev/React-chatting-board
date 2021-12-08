import React, {useEffect, useState} from 'react';
import {GetAllUsers} from "../_redux/actions";

function User(props) {
    const [users, setUserData] = useState([]);
    const getAllUsers = async()=>{
        try {
            const {data} = await GetAllUsers();
            console.log("data = ",data);
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        getAllUsers();
    }, []);
    return ( 
        <div>
            <h1>UserList</h1>
            {users.map((user, i)=>(
                <div key={i}>
                    {user.username}
                </div>
            ))}
        </div>
    );
}

export default User;