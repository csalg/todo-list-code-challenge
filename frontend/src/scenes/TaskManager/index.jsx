import React, {Component, useState} from "react";
import './styles.css'
import TaskEditor from "./TaskEditor";
import backendServices from "./backendServices";
import mockData from "./mockData";
import Context from "./context";
import TaskListFilter, {Filter} from "./TaskListFilter";
import TaskListTable from "./TaskListTable";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editorIsOpen: false,
        taskToEdit: initialTask,
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
                      tasks={this.state.tasks}
                      onTaskUpdate={this.__editTask}
                      onTaskDelete={this.__deleteTask}
                      onTaskCreate={() => this.__editTask(initialTask)}
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

const TaskList = ({tasks, onTaskUpdate, onTaskDelete, onTaskCreate}) => {
    const [context, setContext] = useState({
        text: "",
        tags: [],
        showCompleted: false
    })

    const tags = []
    tasks.forEach(task => task.tags.forEach(tag => {
            if (!tags.includes(tag))
                tags.push(tag)
        }
    ))

    const filteredTasks = tasks.filter(
        task => {
            const completeFilter = !task.completed || context.showCompleted
            const textFilter = task.title.search(context.text) !== -1 || task.description.search(context.text) !== -1
            const __isAnyTaskTagSelected = tags => {
                if (!context.tags.length) {
                    return true
                } else {
                    for (const i in tags) {
                        if (context.tags.includes(tags[i])) {
                            return true
                        }
                    }
                    return false
                }
            }
            const tagsFilter = __isAnyTaskTagSelected(task.tags)
            return completeFilter && textFilter && tagsFilter
        }
    )

    return (
        <Context.Provider value={[context, setContext]}>
            <TaskListFilter
                tags={tags}
            />
            <TaskListTable
                tasks={filteredTasks}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={onTaskDelete}
                onTaskCreate={onTaskCreate}
            />
        </Context.Provider>
    )
}
