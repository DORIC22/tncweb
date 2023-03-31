import React from 'react';
import FilterUsersList from "./FilterUsersList";
import {UsersList} from "./UsersList";

const FilterableUsersList = () => {
    return (
        <>
            <FilterUsersList/>
            <UsersList/>
        </>
    );
};

export default FilterableUsersList;