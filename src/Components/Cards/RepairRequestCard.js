import React from 'react';
import Card from "./Card";
import TechEquipmentIcon from "../Icons/TechEquiepmentIcon";

const RepairRequestCard = ({title, type, id, description, descriptionLength, createdDate}) => {
    return (
        <Card title={title} linkToDetails={`/repair-requests/${id}`}
              image={<TechEquipmentIcon techEquipmentType={type} width={70} height={70}/>} footerTitle='Дата создания:'
              footerValue={createdDate}>
            <div className='flex-1'>
                <p className='text-xs sm:text-base'>
                    {description.slice(0, descriptionLength)}{description.length > descriptionLength && '...'}
                </p>
            </div>
        </Card>
    );
};

export default RepairRequestCard;