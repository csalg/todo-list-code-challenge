import axios from "axios";
import {API_BASE_URL} from "../endpoints";

export default class {
 static deleteTask = item => axios.delete(`${API_BASE_URL}/${item.id}`)
 static updateTask = item => axios.put(`${API_BASE_URL}/${item.id}`, item)
 static createTask = item => axios.post(API_BASE_URL, item)
}
