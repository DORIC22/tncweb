import React from 'react';
import icon_pc from "../Resources/icon_pc.svg";
import icon_printer from "../Resources/icon_printer.svg";
import icon_camera from "../Resources/icon_camera.svg";

const TechEquipmentIcon = ({techEquipmentType, width, height}) => {
    const imgClass = `w-[${width}px] h-[${height}px]`

    if (techEquipmentType === 0)
        return <img src={icon_pc} className={imgClass}/>
    if (techEquipmentType === 1)
        return <img src={icon_printer} className={imgClass}/>
    if (techEquipmentType === 2)
        return <img src={icon_camera} className={imgClass}/>
};

export default TechEquipmentIcon;