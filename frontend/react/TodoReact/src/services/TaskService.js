import axios from "axios"
// TaskService.js
// This service handles API requests related to tasks, including fetching, creating, updating, and deleting tasks.

const baseUrl = "https://localhost:7118/api/Tasks"

//get all tasks
const getAll = () => {

    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//get task by id
const getById = (id) =>{

    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

//get tasks by category
const getByCategory = (categoryId) => {
    const request = axios.get(`${baseUrl}/ByCategory/${categoryId}`)
    return request.then(response => response.data)
}

//create task
const create = (taskFormData) => {
    const request = axios.post(baseUrl, taskFormData)
    return request.then(response => response.data)
}

//update task
const update = (id, taskFormData) => {
    const request = axios.put(`${baseUrl}/${id}`, taskFormData)
    return request.then(response => response.data)
}

//Delete task
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll, getById, getByCategory, create, update, remove}