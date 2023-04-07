    import React, {useState} from 'react';
    import Card from "./Card";
    import UserIcon from "./UserIcon";
    import validator from "validator/es";

    const UserCard = ({title, role, id, email, phone, registrationDate}) => {
        const [isModalChangePassword, setIsModalChangePassword] = useState(false);
        const [isModalDelete, setIsModalDelete] = useState(false);
        const [password, setPassword] = useState('');
        const [rPassword, setRPassword] = useState('');
        const [inputFullName, setInputFullName] = useState('');
        const isDisabled = inputFullName !== title;

        function changePasswordModal() {
            if (isModalChangePassword === false)
            {
                setPassword('')
                setRPassword('')
            }
            setIsModalChangePassword(!isModalChangePassword);
        }
        function deleteModal() {
            setIsModalDelete(!isModalDelete)
        }

        const handleInputChange = (event) => {
            setInputFullName(event.target.value);
        };

        function changePassword() {
            if (validator.isStrongPassword(password))
            {
                if (password === rPassword)
                {
                    //Операция по сохранению пароля дописать какой-то запрос, или на подобии.
                    changePasswordModal()
                }
                else
                    alert('Пароли не совпадают.')

            }
            else
                alert('Сложность пароля не отвечает требованиям безопасности.')

        }


        function deleteUser() {
            //Тут прописываем запрос на удаление юзера, или на подобии.
            deleteModal()
            setInputFullName('')
        }

        return (
            <Card title={title} linkToDetails={'/'} image={<UserIcon userRole={role} width={70} height={70}/>}
                  footerTitle='Дата регистрации:' footerValue={registrationDate}>
                <div className='flex-1'>
                    <p>{email}</p>
                    <p>{phone}</p>
                    <div className='flex sm:gap-16 gap-1 my-2 justify-between'>
                        <button className='text-xs py-1 sm:text-base w-1/2 bg-Accent text-white rounded-lg max-w-[250px]'
                        onClick={changePasswordModal}>
                            Изменить пароль
                        </button>
                        <button className='w-1/2 text-xs sm:text-base bg-Accent text-white rounded-lg max-w-[250px]'
                        onClick={deleteModal}>
                            Удалить
                        </button>
                    </div>

                    {isModalChangePassword && //Модальное окно по смене пароля
                        <>
                            <div
                                className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:px-6 px-2 py-2 rounded-lg min-w-[250px] sm:min-w-[400px] gradient-border border'>
                                <div className=''>
                                    <div className='flex justify-center'>
                                        <p className='text-sm sm:text-base'>Изменить пароль для: {title}</p>
                                    </div>
                                    <div className='my-3 flex-col'>
                                        <input className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light mb-2'
                                               placeholder='Новый пароль'
                                               type='password'
                                               autoComplete='new-password'
                                               value={password}
                                               onChange={(e)=> setPassword(e.target.value)}/>
                                        <input className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light'
                                               placeholder='Повтор пароля'
                                               type='password'
                                               autoComplete='new-password'
                                               value={rPassword}
                                               onChange={(e)=> setRPassword(e.target.value)}/>
                                    </div>
                                    <div className='flex justify-center'>
                                        <button
                                            className='bg-Accent sm:py-3 mx-2 sm:px-6 sm:text-base text-sm rounded-lg py-1.5 px-2 text-white'
                                            onClick={changePasswordModal}
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            className='bg-Accent sm:py-3 mx-2 sm:px-6 sm:text-base text-sm rounded-lg py-1.5 px-2 text-white'
                                            onClick={changePassword}
                                        >
                                            Изменить
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'></div>
                        </>
                    }

                    {isModalDelete && //Модальное окно по удалению пользователя
                        <>
                            <div
                                className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:px-6 px-2 py-2 rounded-lg min-w-[250px] sm:min-w-[400px] gradient-border border'>
                                <div className=''>
                                    <div className='flex justify-center pb-2'>
                                        <p className='text-sm sm:text-base'>Удалить {title} ?</p>
                                    </div>
                                    <div>
                                        <p className=''>Введите данные удаляемого:</p>
                                        <input className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light my-2'
                                               placeholder='ФИО'
                                               type='text'
                                        value={inputFullName}
                                        onChange={handleInputChange}/>
                                    </div>
                                    <div className='flex justify-center'>
                                        <button
                                            className='bg-Accent sm:py-3 sm:px-6 sm:text-base text-sm rounded-lg py-1.5 px-2 text-white mx-2'
                                            onClick={deleteModal}
                                        >
                                            Отмена
                                        </button>

                                        <button
                                            className={`bg-Accent sm:py-3 sm:px-6 sm:text-base text-sm rounded-lg py-1.5 px-2 text-white mx-2 ${
                                                isDisabled && "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
                                            }`}
                                            onClick={deleteUser}
                                            disabled={isDisabled}
                                        >
                                            Удалить
                                        </button>

                                    </div>
                                </div>
                            </div>

                            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'></div>
                        </>
                    }

                </div>
            </Card>
        );
    };

    export default UserCard;