import React from 'react';

export const Square = (props) => {
return (<button className="square-button" onClick={props.clickNotification} disabled={props.isDisabled}>
        {props.value}
       </button>);
}