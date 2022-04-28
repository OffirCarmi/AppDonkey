import { keepService } from '../../services/keep.service.js'

export class Todos extends React.Component {
    state = {
        todos: [],
    }

    componentDidMount() {
        const todos = this.props.keep.info.todos
        this.setState({ todos })
    }

    onRemove = (keepId, todoId) => {
        keepService.removeTodo(keepId, todoId)
            .then((todos) => { this.setState({ todos }) })
    }

    onToggleTodo = (keepId, todoId) => {
        keepService.toggleTodo(keepId, todoId)
            .then((todos) => { this.setState({ todos }) })

    }

    render() {
        const { todos } = this.state
        const { keep } = this.props
        return <section className="todos">
            {todos.map(todo => {
                return <div className="todo flex space-between" key={todo.id}>
                    <input type="checkbox" onChange={() => { this.onToggleTodo(keep.id, todo.id) }} checked={todo.isDone} />
                    <p className={todo.isDone ? 'done' : ''}>{todo.txt}</p>
                    <button onClick={() => { this.onRemove(keep.id, todo.id) }}>x</button>
                </div>
            })}
        </section>
    }
}

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