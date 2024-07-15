import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";

const TaskForm = () => {
    const [name, setName] = useState('');
    const header = {Authorization: `Bearer ${Cookies.get('token')}`}
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        if ({id}.id) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const fetchData = () => {
                axios.get(`${process.env.REACT_APP_BE_URL}tasks/${id}`, {headers: header})
                    .then(response => {
                        setName(response.data.title);
                    })
                    .catch(error => {
                        console.error("Error fetching data: ", error);
                        alert(error.response.statusText)
                    })
            }

            fetchData();
        }

    }, [{id}.id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if ({id}.id) {
            axios.put(`${process.env.REACT_APP_BE_URL}tasks/${id}`, {title: name}, {headers: header})
                .then(response => {
                    console.log(response.data);
                    setName('');
                    return navigate("/");
                })
                .catch(error => {
                    console.error("Error update task: ", error);
                    alert(error.response.statusText)
                });
        } else {
            axios.post(`${process.env.REACT_APP_BE_URL}tasks`, {title: name}, {headers: header})
                .then(response => {
                    console.log(response.data);
                    setName('');
                    return navigate("/");
                })
                .catch(error => {
                    console.error("Error adding task: ", error);
                    alert(error.response.statusText)
                });
        }

    };

    function ButtonSumbit({isUpdate}) {
        if (isUpdate) {
            return (<button type="submit" id="btnSubmit" className="btn btn-primary">Update Task</button>)
        }
        return (<button type="submit" id="btnSubmit" className="btn btn-primary">Add Task</button>)

    }


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
                <ButtonSumbit isUpdate={{id}.id}/>
            </form>
        </div>
    )
}

export default TaskForm;