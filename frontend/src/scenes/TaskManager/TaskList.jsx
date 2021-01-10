import React, {useContext, useState} from "react";
import Context from './context'
import {Filter} from "./TaskListFilter";

const TaskList = (props) => {
    const [context, setContext] = useState({
        text: "",
        tags: [],
        showCompleted: false
    })

    const tags = []
    props.tasks.forEach(task => task.tags.forEach(tag => {
            if (!tags.includes(tag))
                tags.push(tag)
        }
    ))

    const filteredTasks = props.tasks.filter(
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
            <Filter
                tags={tags}
            />
            <TasksTable
                tasks={filteredTasks}
                editCallback={props.editTaskCallback}
                deleteCallback={props.deleteTaskCallback}
            />
        </Context.Provider>
    )
}
const TasksTable = ({tasks, editCallback, deleteCallback}) => {
    return (
        <ul className="list-group list-group-flush">
            <li
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{background: "#fafafa"}}
            >
                <span>Add new task</span>

                <button
                    type="button"
                    title={"Add new task"}
                    style={{alignSelf: "flex-end"}}
                    className="btn btn-primary"
                >
                    Add
                </button>

            </li>
            {tasks.map(
                task =>
                    <Task
                        task={task}
                        deleteCallback={deleteCallback}
                        editCallback={editCallback}
                    />)}
        </ul>
    )
};

const Task = ({task, editCallback, deleteCallback}) => {
    const Details = () => (
        <div>
            <span className={`mr-2 ${task.completed ? "completed-todo" : ""}`}>
                {task.title}
            </span>
            <p className={"todo-description"}>{task.description}</p>
            <div style={{display: "inline-block"}}>
                {tags}
            </div>
        </div>)

    const tags = task.tags.map(tag => (
        <span
            className={'badge badge-pill badge-light'}
            style={{fontWeight: 500, color: "#444"}}
        >
            {tag}
        </span>
    ))

    const Actions = () => (
        <span style={{width: "150px"}}>
            <button
                onClick={() => editCallback(task)}
                className="btn btn-secondary mr-2"
            >
            {" "}
                Edit{" "}
            </button>
            <button
                onClick={() => deleteCallback(task)}
                className="btn btn-danger"
            >
            Delete{" "}
            </button>
        </span>
    )

    return (
        <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <Details/>
            <Actions/>
        </li>
    )
}

export default TaskList
