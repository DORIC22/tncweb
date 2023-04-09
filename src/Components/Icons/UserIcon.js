import React from 'react';
import user from '../../Resources/user.svg'
import tech from '../../Resources/tech.svg'
import admin from '../../Resources/admin.svg'

const UserIcon = ({userRole, width, height}) => {
    const imgClass = `w-[${width}px] h-[${height}px]`

    if (userRole === 0) {
        return <img src={user} className={imgClass}/>
    }
    if (userRole === 1) {
        return <img src={tech} className={imgClass}/>
    }
    if (userRole === 2) {
        return <img src={admin} className={imgClass}/>
    }

};

export default UserIcon;