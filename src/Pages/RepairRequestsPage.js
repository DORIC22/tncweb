import React, {useContext} from 'react';
import {AuthContext} from '../hoc/AuthProvider';
import FilterableRepairRequestList from "../Components/RepairRequestList/FilterableRepairRequestList";

const RepairRequestsPage = () => {
    const {user} = useContext(AuthContext);

    return (
        <div className='w-full mx-auto'>
            <FilterableRepairRequestList/>
        </div>
    );
};

export default RepairRequestsPage;
