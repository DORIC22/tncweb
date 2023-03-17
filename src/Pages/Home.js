import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../hoc/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const [userData, setUserData] = useState(null);

    const orders = [
        { id: 1, title: 'Заказ 1', description: 'Описание заказа 1' },
        { id: 2, title: 'Заказ 2', description: 'Описание заказа 2' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 1, title: 'Заказ 1', description: 'Описание заказа 1' },
        { id: 2, title: 'Заказ 2', description: 'Описание заказа 2' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 1, title: 'Заказ 1', description: 'Описание заказа 1' },
        { id: 2, title: 'Заказ 2', description: 'Описание заказа 2' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 1, title: 'Заказ 1', description: 'Описание заказа 1' },
        { id: 2, title: 'Заказ 2', description: 'Описание заказа 2' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
        { id: 3, title: 'Заказ 3', description: 'Описание заказа 3' },
    ];

    useEffect(() => {
        user.then((data) => {
            setUserData(data);
        });
    }, [user]);

    return (
            <div className="flex h-full p-20">
                <table className='h-full'>
                    <tbody>
                        <tr>
                            <td>
                                <div className="h-full m-6 sm: mx-auto h-5/6 flex-1 pr-2 pl-2 w-full">

                                    <div className='rounded-lg shadow-formShadow'>
                                        <input className=' border border-darkGray px-3 py-2 rounded-lg w-full
                                        shadow-sm focus:outline-none focus:border-Accent_light'
                                        placeholder='Поиск'/>
                                    </div>

                                    <div className='mt-5 rounded-lg shadow-formShadow'>
                                        <select className=' border border-darkGray px-3 py-2 rounded-lg w-full
                                        shadow-sm focus:outline-none focus:border-Accent_light'>
                                            <option value='1'>Нераспределенные</option>
                                            <option value='2'>Активные</option>
                                            <option value='3'>Завершенные</option>
                                            <option value='4'>Отмененные</option>
                                        </select>
                                    </div>

                                    <div className='mt-5 rounded-lg shadow-formShadow p-2'>
                                        <h3 className='ml-1.5'>Тип оборудования</h3>
                                        <div className="flex flex-col">
                                            <label className="inline-flex items-center ml-2">
                                                <input type="checkbox" className="mr-2"/>
                                                    <span>Компьютер</span>
                                            </label>
                                            <label className="inline-flex items-center ml-2">
                                                <input type="checkbox" className="mr-2"/>
                                                    <span>Принтер</span>
                                            </label>
                                            <label className="inline-flex items-center ml-2">
                                                <input type="checkbox" className="mr-2"/>
                                                    <span>Камера</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </td>

                            <td className='px-8'>
                                <div className="mx-auto h-full  overflow-x-hidden overflow-y-auto shadow-formShadow bg-White rounded-md m-6
                                sm:mx-auto h-5/6 overflow-x-hidden overflow-y-auto shadow-formShadow bg-White rounded-md flex-1">
                                    <div className="w-55 align-middle p-0 sm: w-96 align-middle py-2 px-3 mx-auto">
                                        {orders.map((order) => (
                                            <div key={order.id} className="p-1 bg-WhiteThemeMainColor1 m-2 rounded-md">
                                                <h3>{order.title}</h3>
                                                <p>{order.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </td>

                            <td className='w-56'>
                                <div>
                                    Боковая панель
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    );
};

export default Home;
