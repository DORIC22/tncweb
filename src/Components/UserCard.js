import React from 'react';
import Card from "./Card";
import UserIcon from "./UserIcon";

const UserCard = ({title, role, id, email, phone, registrationDate}) => {
    return (
        <Card title={title} linkToDetails={'/'} image={<UserIcon userRole={role} width={70} height={70}/>}
              footerTitle='Дата регистрации:' footerValue={registrationDate}>
            <div className='flex-1'>
                <p>{email}</p>
                <p>{phone}</p>
                <div className='flex sm:gap-16 gap-1 my-2 justify-between'>
                    <button className='text-xs py-1 sm:text-base w-1/2 bg-Accent text-white rounded-lg max-w-[250px]'>
                        Изменить пароль
                    </button>
                    <button className='w-1/2 text-xs sm:text-base bg-Accent text-white rounded-lg max-w-[250px]'>
                        Удалить
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default UserCard;