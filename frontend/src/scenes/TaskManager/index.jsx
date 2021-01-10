import React, {Component} from "react";
import './styles.css'
import TaskList from "./TaskList";
import TaskEditor from "./TaskEditor";
import backendServices from "./backendServices";
import mockData from "./mockData";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editorIsOpen: false,
        taskToEdit: initialTask,
        showCompletedTasks: false,
        tasks: mockData
    };
  }

    render() {
    return (
        <main className="content">
          <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
          <div className="row ">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                  <TaskList
                      toggleCompletedTasks={() => this.setState({showCompletedTasks: !this.state.showCompletedTasks})}
                      tasks={this.state.tasks}
                      editTaskCallback={this.__editTask}
                      deleteTaskCallback={this.__deleteTask}
                  />
              </div>
            </div>
          </div>
          {this.state.editorIsOpen ?
              <TaskEditor
                  task={this.state.taskToEdit}
                  toggle={this.__toggleEditor}
              />
              : null}
        </main>
    )
  }

    componentDidMount() {
        this.__fetchAllTasks();
    }

    __fetchAllTasks = () => {
        backendServices.fetchAllTasks()
            .then(res => this.setState({todoList: res.data}))
            .catch(err => console.log(err)); // TODO: Handle error
    };

    __editTask = task => {
        this.setState({taskToEdit: task});
        this.__openEditor();
    }

    __deleteTask = task => backendServices.deleteTask(task).then(this.__fetchAllTasks)

    __toggleEditor = () => this.state.editorIsOpen ? this.__closeEditor() : this.__openEditor()

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
