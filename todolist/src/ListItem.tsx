import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './classes/ToDo';

type ListItemProps = {
    todo: ToDo,
    handleDelete: (e: any) => void
}

export default function ListItem({todo, handleDelete}: ListItemProps) {
    return (
        <li className="list-group-item">
            {todo.text}
            <button value={todo.id} className="btn btn-danger float-end"
                onClick={handleDelete}
            >X</button>
        </li>
    )
}