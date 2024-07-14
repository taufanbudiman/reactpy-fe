import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [taskId, setTaskId] = useState(0);
    const [btnValue, setBtnValue] = useState('Add Task')
    const header = {Authorization: `Bearer ${Cookies.get('token')}`}
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/tasks', {headers: header})
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                alert(error.response.statusText)
            })
    },);

    const handleDelete = (task_id) => {
        axios.delete(`http://127.0.0.1:5000/tasks/${task_id}`, {headers: header})
            .then(response => {
                console.log("Done");
                setName('');
                setBtnValue("Add Task")
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                alert(error.response.statusText)
            })
    }

    const handleUpdate = (task_id, task_name) => {
        setBtnValue("Update Task")
        setName(task_name)
        setTaskId(task_id)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskId === 0) {
            axios.post('http://127.0.0.1:5000/tasks', {title: name}, {headers: header})
                .then(response => {
                    console.log(response.data);
                    setName('');
                })
                .catch(error => {
                    console.error("Error adding task: ", error);
                    alert(error.response.statusText)
                });
        } else {
            axios.put(`http://127.0.0.1:5000/tasks/${taskId}`, {title: name}, {headers: header})
                .then(response => {
                    console.log(response.data);
                    setName('');
                })
                .catch(error => {
                    console.error("Error update task: ", error);
                    alert(error.response.statusText)
                });
        }
        setBtnValue("Add Task")
        setTaskId(0)
    };


    return (
        <div>
            <h2 className="mb-3">Create Task</h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <input
                    type="text"
                    id="inputTask"
                    className="form-control mb-2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter task"
                />
                <button type="submit" id="btnSubmit" className="btn btn-primary">{btnValue}</button>
            </form>
            <h2 className="mb-3">Tasks</h2>
            <ul className="list-group">
                {tasks.map(task => (
                    <li onClick={() => handleUpdate(task.id, task.title)} className="list-group-item"
                        key={task.id}>{task.title}
                        <button onClick={() => handleUpdate(task.id)} className="btn btn-sm btn-info"
                                style={{float: "right"}}>Edit
                        </button>
                        <button onClick={() => handleDelete(task.id)} className="btn btn-sm btn-danger"
                                style={{float: "right"}}>Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
        ;
};

export default TaskList;