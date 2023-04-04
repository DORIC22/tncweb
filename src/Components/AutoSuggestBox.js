import React, {useState} from 'react';

const AutoSuggestBox = ({itemSource, displayMember, onChangeTech}) => {
    const [searchText, setSearchText] = useState('')
    const [showSuggestBox, setShowSuggestBox] = useState(false)
    const [filterItemSource, setFilterItemSource] = useState([])

    const onChangeSearchText = (searchText) => {
        setSearchText(searchText)
        const filterArray = itemSource.filter(user => user)
        setFilterItemSource((prev) => filterArray)

        if (searchText.length >= 3 && filterArray.length > 0) {
            setShowSuggestBox(true)
        } else {
            setShowSuggestBox(false)
        }
    }

    const onSelectedTech = (item) => {
        setSearchText(item[displayMember]);
        setShowSuggestBox(false)
        onChangeTech(item.id)
    }

    /*
        email
        firstName
        fullName
        id
        lastName
        password
        patronymic
        phone
        role
     */


    return (
        <div className='relative'>
            <input
                className={`text-sm sm:text-base border border-gray-900 rounded-lg pl-1 focus:outline-none focus:border-Accent_light
                 ${showSuggestBox && 'rounded-b-none border-b-0'}`}
                placeholder='Не назначено'
                type='search'
                value={searchText}
                onChange={(e) => onChangeSearchText(e.target.value)}/>

            {showSuggestBox &&
                <ul
                    className={`absolute flex flex-col gap-1 w-full bg-gray-500 max-h-[130px] h-auto overflow-auto border border-gray-900 rounded-lg rounded-t-none -mt-0.5`}>
                    {filterItemSource.map((item) => (
                        <li className={'bg-white'} key={item.id}
                            onClick={() => onSelectedTech(item)}>
                            <p className='text-xs bg-Accent p-2'>{item[displayMember]}</p>
                        </li>
                    ))}
                </ul>}

        </div>
    );
};

export default AutoSuggestBox;