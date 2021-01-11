import React from "react";

export default ({tasks, onTaskUpdate, onTaskDelete, onTaskCreate}) => {
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
                    onClick={onTaskCreate}
                >
                    Add
                </button>

            </li>
            {tasks.map(
                task =>
                    <Task
                        task={task}
                        onTaskDelete={onTaskDelete}
                        onTaskUpdate={onTaskUpdate}
                    />)}
        </ul>
    )
};

const Task = ({task, onTaskUpdate, onTaskDelete}) => {
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
                onClick={() => onTaskUpdate(task)}
                className="btn btn-secondary mr-2"
            >
            {" "}
                Edit{" "}
            </button>
            <button
                onClick={() => onTaskDelete(task)}
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

