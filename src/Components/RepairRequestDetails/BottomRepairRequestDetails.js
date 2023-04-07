import React from 'react';

const BottomRepairRequestDetails = ({updateRepairRequest}) => {

    return (
        <div className='flex justify-center mt-6'>
            <button className='bg-Accent px-6 w-2/3 text-white py-2 rounded-lg shadow-formShadow sm:w-2/5'
                    onClick={updateRepairRequest}
            >
                Сохранить
            </button>
        </div>
    );
};

export default BottomRepairRequestDetails;