import React, {Component} from "react";
import Modal from "./Modal";
import axios from "axios";
import {API_BASE_URL} from "../endpoints";
import './App.css'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false
        }
    }

    render() {
        const CompletedTasksFilter = () => (
            <div className="my-5 tab-list">
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Show completed tasks</label>
                </div>
            </div>
        )
        return (
            <div>
            <CompletedTasksFilter/>
        <ul className="list-group list-group-flush">
                {this.__renderItems()}
            </ul>
            </div>
        )
    }

    __renderItems () {
        const { viewCompleted } = this.state;
        const newItems = this.props.tasks.filter(
            item => item.completed === viewCompleted
        );
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
        <span
            className={`todo-title mr-2 ${
                this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.description}
        >
          {item.title}
        </span>
                <span>
          <button
              onClick={() => this.editItem(item)}
              className="btn btn-secondary mr-2"
          >
            {" "}
              Edit{" "}
          </button>
          <button
              onClick={() => this.deleteTask(item)}
              className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
            </li>
        ));
    };
}
