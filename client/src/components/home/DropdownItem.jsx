import React from "react";
import "../../css/homepage.css"

function DropdownItem(props){
    return <a id={props.id} href={`/viewComposer?id=${props.id}`}><div className='option'>{props.name}</div></a>
}

export default DropdownItem 