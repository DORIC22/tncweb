import React, {useContext} from 'react';
import {AuthContext} from "../hoc/AuthProvider";

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='mx-auto h-full'>
            <div> Welcome {user?.firstName || "Зайчик"}</div>
            Home Page
        </div>
    );
};

export default Home;