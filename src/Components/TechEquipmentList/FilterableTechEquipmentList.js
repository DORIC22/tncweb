import React from 'react';
import FilterTechEquipmentList from "./FilterTechEquipmentList";
import {TechEquipmentList} from "./TechEquipmentList";

const FilterableTechEquipmentList = () => {
    return (
        <>
            <FilterTechEquipmentList/>
            <TechEquipmentList/>
        </>
    );
};

export default FilterableTechEquipmentList;