import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const CreateTask = () => {
    const [name, setName] = useState('');
    const header = {Authorization: `Bearer ${Cookies.get('token')}`}
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/tasks', { name }, { headers: header })
            .then(response => {
                console.log(response.data);
                setName('');
            })
            .catch(error => {
                console.error("Error adding task: ", error);
            });
    };


    return (
        <div>
            <h2 className="mb-3">Create Task</h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <input id="inputTaskId" hidden="hidden" />
                <input
                    type="text"
                    id="inputTask"
                    className="form-control mb-2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter task"
                />
                <button type="submit" id="btnSubmit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};

export default CreateTask;