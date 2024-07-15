import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const header = {Authorization: `Bearer ${Cookies.get('token')}`}
    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:5000/tasks', {headers: header})
                .then(response => {
                    setTasks(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    alert(error.response.statusText)
                })
        }

        fetchData();
    }, []);
    return (
        <div>
            <h2 className="mb-3">Tasks</h2>
            <ul className="list-group">
                {tasks.map(task => (
                    <li className="list-group-item"
                        key={task.id}>{task.title}
                        <Link to={`/form/${task.id}`} className={"btn btn-sm btn-info"}
                              style={{float: "right"}}>Edit</Link>
                        <Link to={`/detail/${task.id}`} className={"btn btn-sm btn-warning"}
                              style={{float: "right"}}>Detail</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList;