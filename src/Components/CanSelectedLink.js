import React from 'react';
import {Link, useMatch} from "react-router-dom";

const CanSelectedLink = ({children, to, ...props}) => {
    const isSelected = useMatch(to)

    return (
        <Link to={to}
              style={{
                  color: isSelected ? '#839BFF' : 'black'
              }}
              {...props}
              className={`${props.className} ${isSelected ? 'border-Accent' : 'border-white'} border-l-2 px-4 md:px-0 md:border-none`}>
            {children}
        </Link>
    );
};

export default CanSelectedLink;