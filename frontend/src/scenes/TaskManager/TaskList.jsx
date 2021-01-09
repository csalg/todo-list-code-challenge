import React, {useState} from "react";

const TaskList = (props) => {
    const [showCompleted, setShowCompleted] = useState(false);
    const toggleShowCompleted = () => setShowCompleted(!showCompleted)

    const CompletedTasksCheckbox = () => (
        <div className="my-5 tab-list">
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    checked={showCompleted}
                    onClick={toggleShowCompleted}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">Show completed tasks</label>
            </div>
        </div>
    )

    return (
        <div>
            <CompletedTasksCheckbox/>
            <TasksTable
                tasks={props.tasks.filter(task => (!task.completed || showCompleted))}
                editCallback={props.editTaskCallback}
                deleteCallback={props.deleteTaskCallback}
            />
        </div>
    )
}

const TasksTable = ({tasks, editCallback, deleteCallback}) => (
    <ul className="list-group list-group-flush">
        {tasks.map(task => (
            <li
                key={task.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
        <span
            className={`todo-title mr-2 ${
                task.completed ? "completed-todo" : ""
            }`}
            title={task.description}
        >
          {task.title}
        </span>
                <span>
          <button
              onClick={() => editCallback(task)}
              className="btn btn-secondary mr-2"
          >
            {" "}
              Edit{" "}
          </button>
          <button
              onClick={() => editCallback(task)}
              className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
            </li>
        ))}
    </ul>

);

export default TaskList
