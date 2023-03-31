import React from 'react';
import FilterableUsersList from "../Components/UsersList/FilterableUsersList";

const UsersPage = () => {
    return (
        <div className='w-full mx-auto'>
            <FilterableUsersList/>
        </div>
    );
};

export default UsersPage;