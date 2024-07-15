import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";

const TaskItem = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [task, setTasks] = useState({});
    const header = {Authorization: `Bearer ${Cookies.get('token')}`}

    useEffect(() => {
         const fetchData = () => {
                axios.get(`${process.env.REACT_APP_BE_URL}tasks/${id}`, {headers: header})
                    .then(response => {
                        console.log(response.data)
                        setTasks(response.data);
                    })
                    .catch(error => {
                        console.error("Error fetching data: ", error);
                        alert(error.response.statusText)
                    })
            }

            fetchData();
    }, []);

    const handleDelete = (task_id) => {
        axios.delete(`${process.env.REACT_APP_BE_URL}tasks/${task_id}`, {headers: header})
            .then(response => {
                console.log("Done");
                return navigate("/");
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                alert(error.response.statusText)
            })
    }

    return (
        <div>
            <h2 className="mb-3">Tasks</h2>
            <ul className="list-group">
                <li className="list-group-item"
                    key={task.id}>{task.title}
                    <Link to={`/form/${task.id}`} className={"btn btn-sm btn-info"}
                          style={{float: "right"}}>Edit</Link>
                    <button onClick={() => handleDelete(task.id)}  className={"btn btn-sm btn-danger"}
                          style={{float: "right"}}>Delete</button>
                </li>
            </ul>
        </div>
    )
}

export default TaskItem