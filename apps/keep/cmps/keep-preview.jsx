import { keepService } from '../services/keep.service.js'
const { Link } = ReactRouterDOM
export class KeepPreview extends React.Component {

    render() {
        const { keep, onRemoveKeep } = this.props
        const { type, id } = keep

        return <article className="keep-preview flex col space-between">

            <main className="keep-body">
                {/* <section className="keep-type">{type}</section> */}
                {/* {type === 'keep-txt' && <Type />}
                {type === 'keep-img' && <Type />}
                {type === 'keep-txt' && <Type />} */}
            </main>
            <aside className="keep-tools flex space-between">
                <button>color</button>
                <button>pin</button>
                <button onClick={() => onRemoveKeep(id)}>delete</button>
                <button>mail</button>
            </aside>
        </article>
    }
}