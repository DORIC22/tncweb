import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../hoc/AuthProvider';
import ky from "ky";
import RepairRequestList from "../Components/RepairRequestList";
import FilterableRepairRequestList from "../Components/FilterableRepairRequestList";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='screenMobile w-full sm:mt-1 sm:w-1/2'>
            <FilterableRepairRequestList />
        </div>
    );
};

export default Home;
