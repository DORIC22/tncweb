import React, {useContext} from 'react';
import {AuthContext} from '../hoc/AuthProvider';
import FilterableRepairRequestList from "../Components/FilterableRepairRequestList";

const Home = () => {
    const {user} = useContext(AuthContext);

    return (
        <div>
            <FilterableRepairRequestList />
        </div>
    );
};

export default Home;
