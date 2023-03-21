import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../hoc/AuthProvider';
import ky from "ky";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [selectedObject, setSelectedObject] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [userData, setUserData] = useState(null);
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]); //Для вывода отфильтрованного по поиску списка

    useEffect(() => {
        const fetchData = async () => {
            const result = await ky.get('http://5.128.221.139:7119/api/repairrequest', {
                headers: {
                    'x-apikey': '59a7ad19f5a9fa0808f11931',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }).json();
            setRequests(result);
        };
        fetchData();
    }, []);

    useEffect(() => { //Для отображения списка при первой загрузке.
        if (requests.length > 0) {
            setFilteredRequests(requests);
        }
    }, [requests]);

    useEffect(() => {
        user.then((data) => {
            setUserData(data);
        });
    }, [user]);

    function signOut() {
        localStorage.setItem("UserAuth", "false")
        window.location.href = "/";
    }

    function changeUserFor() {
        console.log('ggbet')
    }



    const searchByTechEquipmentId = (requests, searchValue) => {
        return requests.filter(request => {
            // преобразовываем числовое значение в строку
            const idString = request.techEquipmentId.toString();
            // проверяем, содержит ли строка idString искомое значение searchValue
            return idString.includes(searchValue) || request.description.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        if (searchValue.trim() === '') {
            setFilteredRequests(requests);
        } else {
            setFilteredRequests(searchByTechEquipmentId(requests, searchValue));
        }
    }

    return (
            <div className="flex h-full p-20">
                <table className='h-full mt-6'>
                    <tbody>
                        <tr>
                            <td>
                                <div className="h-full m-6 sm:w-72 mx-auto h-5/6 flex-1 pr-2 pl-2 w-full">

                                    <div className='rounded-lg shadow-formShadow'>
                                        <input
                                            className='border border-darkGray px-3 py-2 rounded-lg w-full
                                            shadow-sm focus:outline-none focus:border-Accent_light'
                                            placeholder='Поиск'
                                            onChange={handleSearch}
                                        />
                                    </div>

                                    <div className='mt-5 rounded-lg shadow-formShadow'>
                                        <select className=' border border-darkGray px-3 py-2 rounded-lg w-full
                                        shadow-sm focus:outline-none focus:border-Accent_light'
                                        >
                                            <option value='0'>В работе</option>
                                            <option value='1'>Активные</option>
                                            <option value='2'>Завершенные</option>
                                            <option value='3'>Отмененные</option>
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

                                    <div className='mt-5 rounded-lg shadow-formShadow p-2'>
                                        <button className='bg-WhiteThemeMainColor2 rounded-lg font-medium w-full h-10'
                                        onClick={signOut}>
                                            Выйти
                                        </button>
                                    </div>

                                </div>
                            </td>

                            <td className='px-8'>
                                <div className="mx-auto h-full  overflow-x-hidden overflow-y-auto shadow-formShadow bg-White rounded-md m-6
                                    sm:mx-auto h-5/6 overflow-x-hidden overflow-y-auto shadow-formShadow bg-White rounded-md flex-1">
                                    <div className="w-96 align-middle py-2 px-2 mx-auto">
                                        {filteredRequests.map((request) => (
                                            <div
                                                key={request.id}
                                                className="p-1 bg-WhiteThemeMainColor1 m-2 rounded-md"
                                                onClick={() => {setSelectedObject(request);
                                                    const usrFrom = async () => {
                                                        const userResult = await ky.get(`http://5.128.221.139:7119/api/users?Id=${request.userFromId}`, {
                                                            headers: {
                                                                'x-apikey': '59a7ad19f5a9fa0808f11931',
                                                                'Access-Control-Allow-Origin': '*',
                                                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                                            }
                                                        }).json();
                                                        setSelectedObject(prevState => ({...prevState, userFromName: userResult.fullName}))
                                                    };
                                                    usrFrom();
                                                    const usrTo = async () => {
                                                        const userResult = await ky.get(`http://5.128.221.139:7119/api/users?Id=${request.userToId}`, {
                                                            headers: {
                                                                'x-apikey': '59a7ad19f5a9fa0808f11931',
                                                                'Access-Control-Allow-Origin': '*',
                                                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                                            }
                                                        }).json();
                                                        setSelectedObject(prevState => ({...prevState, userForName: userResult.fullName, userForId: userResult.id}))
                                                    };
                                                    usrTo();
                                                }}
                                            >
                                                <div className='flex justify-between'>
                                                    <h3>ID: {request.techEquipmentId}</h3>
                                                    <h3 className='mr-1'>№ {request.id}</h3>
                                                </div>
                                                Описание:
                                                <p>{request.description.length > 100 ? request.description.slice(0, 100) + '...' : request.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </td>

                            <td className='p-0 display flex'>
                                <div className="sm: mx-auto flex-1 px-0 w-72">
                                    {selectedObject && (
                                        <div className="p-1.5 bg-WhiteThemeMainColor1 rounded-md shadow-formShadow">
                                            <div className='flex justify-center'>
                                                <h3>Заявка № {selectedObject.id}</h3>
                                            </div>
                                            <h3>ID: {selectedObject.techEquipmentId}</h3>
                                            <h3>IP: {selectedObject.techIpAddress}</h3>
                                            <div className='h-72 border-2 p-1'>
                                                Описание:
                                                <h3 className='text-xs'>{selectedObject.description}</h3>
                                            </div>
                                            Статус:
                                            <div>
                                                <select
                                                    className='rounded-md'
                                                    value={selectedObject.status}
                                                    onChange={(e) => setSelectedObject({...selectedObject, status: e.target.value})}>
                                                    <option value='0'>Принята</option>
                                                    <option value='1'>В работе</option>
                                                    <option value='2'>Завершена</option>
                                                    <option value='3'>Отменена</option>
                                                </select>
                                            </div>
                                            <h3>От: {selectedObject.userFromName}</h3>
                                            <h3>Назначена на:</h3>
                                            <h3 className='text-Accent_light cursor-pointer underline' onClick={changeUserFor}>
                                                {selectedObject.userForName ? selectedObject.userForName : 'Назначить сейчас'}
                                            </h3>
                                            <div className='flex flex-col justify-end h-12'>
                                                <button className='bg-WhiteThemeMainColor2 rounded-lg font-medium mx-9 p-1'>
                                                    Сохранить изменения
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    );
};

export default Home;
