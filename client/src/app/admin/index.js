import React from "react";
import User from './User';

function AdminPage() {

    return (
        <div className="container">
            <h1 className="text-uppercase text-black-50 text-center my-10">entrepreneurs et professionnels congolais et d’ailleurs</h1>
            <User/>
        </div>
    )
}

export default AdminPage;