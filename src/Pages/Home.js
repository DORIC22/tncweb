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
            <div className='mx-auto h-full overflow-auto shadow-formShadow bg-White rounded-md m-6
                sm:mx-auto max-h-100 overflow-auto shadow-formShadow bg-White rounded-md m-10'>
                <div className='w-55 align-middle p-0
                        sm:w-80 align-middle p-2'>
                    {orders.map((order) => (
                        <div key={order.id} className='p-1 bg-WhiteThemeMainColor1 m-2 rounded-md'>
                            <h3>{order.title}</h3>
                            <p>{order.description}</p>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default Home;
