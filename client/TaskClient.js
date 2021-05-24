import axios from "axios"
import { BASE_URL } from "../utils/requests"

class TaskClient {

    static getAllTasks(){
        return axios.get(BASE_URL+'/task')
    }

    static getTask(taskName){
        return axios.get(`${BASE_URL}/task/${taskName}`)
    }

    static deleteTask(taskName){
        return axios.delete(`${BASE_URL}/task/${taskName}`)
    }

    static changeTaskStatus(taskName){
        return axios.put(`${BASE_URL}/task/${taskName}`)
    }

    static createTask(taskName, taskDesc) {
        const payload = {
            'name': taskName,
            'description': taskDesc
        }

        return axios.post(`${BASE_URL}/task/`, payload)
    }
}

export default TaskClient