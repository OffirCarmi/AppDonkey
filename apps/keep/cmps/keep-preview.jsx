import { Txt } from './keep-types/txt.jsx'
import { Img } from './keep-types/img.jsx'
import { Todos } from './keep-types/todos.jsx'
const { Link } = ReactRouterDOM
export class KeepPreview extends React.Component {

    render() {
        const { keep, onRemoveKeep } = this.props
        const { type, id } = keep

        return <article key={id} className="keep-preview flex col space-between">
            <section className="keep-body">
                <_DynamicCmp keep={keep} />
            </section>
            <aside className="keep-tools flex space-between">
                <button>color</button>
                <button>pin</button>
                <button>edit</button>
                <button onClick={() => onRemoveKeep(id)}>delete</button>
                <button>mail</button>
            </aside>
        </article>
    }
}

function _DynamicCmp({ keep }) {
    // console.log(type);
    switch (keep.type) {
        case 'keep-txt':
            return <Txt keep={keep} />
        case 'keep-img':
            return <Img keep={keep} />
        case 'keep-todos':
            return <Todos keep={keep} />
        default: <React.Fragment></React.Fragment>
    }
}