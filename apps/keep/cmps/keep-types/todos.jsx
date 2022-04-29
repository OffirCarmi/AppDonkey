import { keepService } from '../../services/keep.service.js'

export class Todos extends React.Component {
    state = {
        todos: [],
        input: ''
    }

    componentDidMount() {
        const todos = this.props.keep.info.todos
        this.setState({ todos })
    }

    onRemove = (keepId, todoId) => {
        keepService.removeTodo(keepId, todoId)
            .then((todos) => { this.setState((prevState) => ({ ...prevState, todos })) })
        // .then((todos) => { this.setState({ todos }) })
    }

    onToggleTodo = (keepId, todoId) => {
        keepService.toggleTodo(keepId, todoId)
            .then((todos) => { this.setState({ todos }) })

    }

    handleChange = ({ target }) => {
        const input = target.value
        this.setState((prevState) => ({ ...prevState, input }))
    }

    onAddTodo = (keepId) => {
        event.preventDefault()
        const input = event.target[0].value
        keepService.addTodo(keepId, input)
            .then((todos) => { this.setState({ todos, input: '' }) })
    }

    render() {
        const { todos, input } = this.state
        const { keep, onUpdateKeep } = this.props
        return <section className="todos flex col space-between">
            {todos.map(todo => {
                return <div className="todo flex space-between" key={todo.id}>
                    <input type="checkbox" onChange={() => { this.onToggleTodo(keep.id, todo.id) }} checked={todo.isDone} />
                    <p contentEditable onBlur={() => { onUpdateKeep(event, keep.id, todo.id) }} className={todo.isDone ? 'done' : ''}>{todo.txt}</p>
                    <button onClick={() => { this.onRemove(keep.id, todo.id) }}>x</button>
                </div>
            })}
            <form className="new-todo" onSubmit={() => this.onAddTodo(keep.id)}>
                <input type="text" value={input} placeholder="Add new todo" onChange={this.handleChange} />
            </form>
        </section>
    }
}


// export class Todos extends React.Component {
//     state = {
//         todos: [],
//     }

//     componentDidMount() {
//         const todos = this.props.keep.info.todos
//         this.setState({ todos })
//     }

//     onRemove = (keepId, todoId) => {
//         keepService.removeTodo(keepId, todoId)
//             .then((todos) => { this.setState({ todos }) })
//     }

//     onToggleTodo = (keepId, todoId) => {
//         keepService.toggleTodo(keepId, todoId)
//             .then((todos) => { this.setState({ todos }) })

//     }

//     onAddTodo = (keepId) => {
//         event.preventDefault()
//         // console.log(event.target);
//         console.log(keepId);
//         // keepService.addTodo()
//     }

//     render() {
//         const { todos } = this.state
//         const { keep } = this.props
//         return <section className="todos">
//             {todos.map(todo => {
//                 return <div className="todo flex space-between" key={todo.id}>
//                     <input type="checkbox" onChange={() => { this.onToggleTodo(keep.id, todo.id) }} checked={todo.isDone} />
//                     <p className={todo.isDone ? 'done' : ''}>{todo.txt}</p>
//                     <button onClick={() => { this.onRemove(keep.id, todo.id) }}>x</button>
//                 </div>
//             })}
//             <form onSubmit={() => this.onAddTodo(keep.id)}>
//                 <input type="text" placeholder="Add new todo" />
//             </form>
//         </section>
//     }
// }

//DO NOT DELETE - WORKING FUNCTION
// export function Todos({ keep }) {
//     const { info } = keep
//     const { todos } = info
//     // console.log(todos);
//     return <section className="todos">
//         {todos.map(todo => {
//             return <div className="todo flex space-between" key={todo.id}>
//                 <p>{todo.txt}</p>
//                 <button>x</button>
//             </div>
//         })}
//     </section>
// }