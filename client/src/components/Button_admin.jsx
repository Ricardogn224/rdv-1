import React from 'react';

function ButtonAdmin({ txtButton, route }) {
    return (
        <div className='button-admin-container'>
            <a href={route} className='button-item-admin'>{txtButton}</a>
        </div>
    );
}
    
export default ButtonAdmin;