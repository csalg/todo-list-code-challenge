import React, {Component} from "react";
import axios from "axios";
import {API_BASE_URL} from "../endpoints";
import './App.css'
import TaskList from "./TaskList";
import TaskEditor from "./TaskEditor";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorIsOpen: false,
      taskToEdit: initialTask,
      tasks: [
        {
          title: "Task XYZ",
          description: "Description",
          completed: true
        },
        {
          title: "Task XYZ",
          description: "Description",
          completed: false
        },
        {
          title: "Task XYZ",
          description: "Description",
          completed: false
        },
      ]
    };
  }

  render() {
    const CreateNewTaskButton = () => (
        <div>
          <button
              onClick={this.__openEditor}
              className="btn btn-primary"
          >
            Add task
          </button>
        </div>
    )

    return (
        <main className="content">
          <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
          <div className="row ">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <CreateNewTaskButton/>
                <TaskList
                    tasks={this.state.tasks}
                />
              </div>
            </div>
          </div>
          {this.state.editorIsOpen ?
              <TaskEditor
                  taskToEdit={this.state.taskToEdit}
                  closeCallback={this.__closeEditor}/>
              : null}
        </main>
    )
  }

  componentDidMount() {
    this.__fetchAllTasks();
  }

  __fetchAllTasks = () => {
    axios
        .get(API_BASE_URL)
        .then(res => this.setState({todoList: res.data}))
        .catch(err => console.log(err)); // TODO: Handle error
  };

  __openEditor = () => this.setState({editorIsOpen: true});

  __closeEditor = () => {
    this.setState({
        editorIsOpen: false,
        taskToEdit: initialTask
        });
    this.__fetchAllTasks();
  }
}

const initialTask = {
    id: null,
    title: "",
    description: "",
    completed: false
}
