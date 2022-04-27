import { KeepPreview } from '../cmps/keep-preview.jsx'

export class KeepList extends React.Component {
    render() {
        const {keeps,onRemoveKeep} = this.props
        return <section className="keep-list">
            {keeps.map(keep => <KeepPreview keep={keep} key={keep.id} onRemoveKeep={onRemoveKeep} />)}
        </section>
    }
}