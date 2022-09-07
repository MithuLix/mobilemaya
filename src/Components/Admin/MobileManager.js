import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';


export default function MobileManager(props) {
    const { name, _id, price } = props.item;
    const history = useHistory();
    const handleDelete = id => {
        fetch(`https://mobilemaya-server-production.up.railway.app/delete/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => { 
                alert(`${name} was deleted`) 
                history.push('/addMobile')}
        )};


    //css
    const icon1 = { color: "green", marginRight: "1rem", cursor: "pointer" }
    const icon2 = { color: "red", cursor: "pointer" }

    return (
        <tr>
            <td>{name}</td>
                <td>{price}</td>
            <td className="text-center">
                <FontAwesomeIcon icon={faPencilAlt} style={icon1} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(_id)} style={icon2} />
            </td>
        </tr>
   );
};