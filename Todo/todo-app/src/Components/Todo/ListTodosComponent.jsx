import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import TodoDataService from '../../api/todo/TodoDataService.js'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos:
                [
                ],
            message: null
        }
        this.deleteTodoClicked=this.deleteTodoClicked.bind(this)
        this.refreshTodos=this.refreshTodos.bind(this)
        this.updateTodoClicked=this.updateTodoClicked.bind(this)
        this.addTodoClicked=this.addTodoClicked.bind(this)
    }
    componentDidMount(){
        this.refreshTodos()
    }
    refreshTodos(){
        let username= AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({todos:response.data})
            }
        )
    }
    componentWillUnmount(){
        console.log('componentWillUnmound')
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('ShouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true

    }
    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }
    deleteTodoClicked(id){
        let username= AuthenticationService.getLoggedInUsername()
        TodoDataService.deleteTodo(username,id)
        .then(
            response => {
                this.setState({
                    message:`Delete of todo ${id} successful!!`
                })
                this.refreshTodos()
            }
        )
    } 
    updateTodoClicked(id){
        this.props.history.push(`/todos/${id}`)
    } 
    render() {
        return <div id="todocomponent">
            <h1 >List Todos</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Is Completed</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th> Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td> <button className="btn btn-success" onClick={()=>this.updateTodoClicked(todo.id)}>Update</button> </td>
                                        <td> <button className="btn btn-warning" onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button> </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="row">
                        <button id="LastButton" className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
            </div>
            <hr></hr>
        </div>
    }
}
export default ListTodosComponent