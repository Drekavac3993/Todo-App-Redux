import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTast, removeTask, completeTask, changeFilter } from '../actions/actionCreator';
import ToDoInput from '../components/todo-input';
import ToDoList from '../components/todo-list';
import Footer from '../components/footer';

import './todo.css';

class ToDo extends Component {

    state = {
        taskText: ''
    };

    handleInput = ({ target: { value } }) => {
        this.setState({
            taskText: value
        })
    };

    addTast = ({ key }) => {
        const { taskText } = this.state;

        if(taskText.length > 3 && key === 'Enter') {
            const { addTast } = this.props;
            addTast((new Date()).getTime(), taskText, false);
            this.setState({
                taskText: ''
            })
        }
    };

    filterTasks = (tasks, activeFilter) => {
        switch (activeFilter) {
            case 'completed':
                return tasks.filter(task => task.isCompleted);
                break;
            case 'active':
                return tasks.filter(task => !task.isCompleted);
                break;
            default:
                return tasks;
        }
    };

    getActiveTasksCounter = (tasks) => tasks.filter(task => !task.isCompleted).length;

    render() {
        const { taskText } = this.state;
        const { tasks, removeTask, completeTask, filters, changeFilter } = this.props;
        const isTasksExist = tasks && tasks.length > 0;
        const filteredTask = this.filterTasks(tasks, filters);
        const taskCounter = this.getActiveTasksCounter(tasks);

        return (
            <div className="todo-wrapper">
                <ToDoInput onKeyPress={this.addTast} onChange={this.handleInput} value={taskText}/>
                {isTasksExist && <ToDoList completeTask={completeTask} tasksList={filteredTask} removeTask={removeTask}/>}
                {isTasksExist && <Footer changeFilter={changeFilter} amount={taskCounter} activeFilter={filters} />}
            </div>
        );
    }
}

export default connect(({ tasks, filters }) => ({
    tasks,filters
}), { addTast, removeTask, completeTask, changeFilter })(ToDo);
