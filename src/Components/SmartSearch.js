import React, {useState} from 'react';

const SmartSearch = ({placeholder, onChange}) => {
    const [value, setValue] = useState('');

    function clearInput() {
        setValue('');
    }

    return (
        <div className='bg-gray-500'>
            <input
                placeholder={placeholder}
                className='border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light'
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            <button className='bg-red-600 absolute -ml-6 mt-2.5' onClick={clearInput}>
        <span className='absolute mt-2.5'>
          <span
              className='block w-5 h-0.5 bg-gray-500 transform rotate-45 origin-center absolute left-0 top-1/2'></span>
          <span
              className='block w-5 h-0.5 bg-gray-500 transform -rotate-45 origin-center absolute left-0 top-1/2'></span>
        </span>
            </button>
        </div>
    );
};

export default SmartSearch;