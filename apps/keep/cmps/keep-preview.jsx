import { Txt } from './keep-types/txt.jsx'
import { Img } from './keep-types/img.jsx'
import { Todos } from './keep-types/todos.jsx'
import { Video } from './keep-types/video.jsx'
import { BgColor } from './dynamic-colors/bg-color.jsx'
import { Modal } from '../cmps/keep-modal.jsx'

const { Link } = ReactRouterDOM

export class KeepPreview extends React.Component {
    state = {
        showColors: false,
        isModal: true
    }

    toggleColors = () => {
        this.setState({ showColors: !this.state.showColors })
    }

    toggleModal = () => {
        this.setState({ isModal: !this.state.isModal })

    }

    render() {
        const { keep, onRemoveKeep, onDuplicateKeep, onPinKeep } = this.props
        const { id } = keep
        const { isModal } = this.state

        if (!keep) return

        return <article style={{ backgroundColor: (!keep.color) ? 'White' : keep.color }} key={id}
            className="keep-preview flex col space-between tilt-in-fwd-tl"
            onClick={this.toggleModal}>
            <section className="keep-body">
                <_DynamicCmp keep={keep} onUpdateKeep={this.props.onUpdateKeep} />
            </section>
            {/* {isModal && <Modal keep={keep} toggleModal={this.toggleModal} />} */}
            <aside className="keep-tools">
                <button className="keep-tool-color" onClick={this.toggleColors}></button>
                <button className="keep-tool-pin" onClick={() => onPinKeep(id)} style={{ color: (keep.isPinned ? 'Red' : '') }}></button>
                <button className="keep-tool-delete" onClick={() => onRemoveKeep(id)}></button>
                <button className="keep-tool-duplicate" onClick={() => onDuplicateKeep(id)} ></button>
                {/* <button className="keep-tool-mail"></button> */}
            </aside>
            {this.state.showColors && <BgColor onChangeColor={this.props.onChangeColor} keepId={keep.id} toggleColors={this.toggleColors} />}
        </article>
    }
}

function _DynamicCmp({ keep, onUpdateKeep }) {
    // console.log(keep);
    switch (keep.type) {
        case 'keep-txt':
            return <Txt keep={keep} onUpdateKeep={onUpdateKeep} />
        case 'keep-img':
            return <Img keep={keep} />
        case 'keep-todos':
            return <Todos keep={keep} onUpdateKeep={onUpdateKeep} />
        case 'keep-video':
            return <Video keep={keep} />
        default: <React.Fragment></React.Fragment>
    }
}