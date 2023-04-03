import React, {useState} from 'react';
import FilterUsersList from "./FilterUsersList";
import {UsersList} from "./UsersList";

const FilterableUsersList = () => {
    const [searchText, setSearchText] = useState('')
    const [role, setRole] = useState(0)
    const [sortDateByDesc, setSortDateByDesc] = useState(false)

    const onChangeSearchText = (text) => {
        setSearchText(text)
    }

    const onChangeRole = (role) => {
        setRole(role)
    }

    const onChangeDateSorting = () => {
        setSortDateByDesc((prev) => !prev)
    }

    return (
        <>
            <FilterUsersList onChangeSearchText={onChangeSearchText}
                             onChangeRole={onChangeRole}
                             onChangeDateSorting={onChangeDateSorting}
                             searchText={searchText}
                             sortDateByDesc={sortDateByDesc}/>
            <UsersList searchText={searchText}
                       role={role}/>
        </>
    );
};

export default FilterableUsersList;