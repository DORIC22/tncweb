import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../hoc/AuthProvider';
import ky from "ky";
import RepairRequestList from "../Components/RepairRequestList";
import FilterableRepairRequestList from "../Components/FilterableRepairRequestList";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <FilterableRepairRequestList/>
    );
};

export default Home;
