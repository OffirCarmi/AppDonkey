import { Txt } from './keep-types/txt.jsx'
import { Img } from './keep-types/img.jsx'
import { Todos } from './keep-types/todos.jsx'
import { Video } from './keep-types/video.jsx'
import { BgColor } from './dynamic-colors/bg-color.jsx'
import { keepService } from '../services/keep.service.js'
const { Link } = ReactRouterDOM

export class KeepPreview extends React.Component {
    state = {
        showColors: false,

    }

    onShowColors = () => {
        event.stopPropagation()
        this.setState({ showColors: !this.state.showColors })
    }


    onHideColors = () => {
        event.stopPropagation()
        this.setState({ showColors: !this.state.showColors })
    }

    // onUpdateKeep={this.props.onUpdateKeep}

    render() {
        const { color } = this.state
        const { keep, onRemoveKeep } = this.props
        const { type, id } = keep

        return <article style={{ backgroundColor: (!keep.color) ? 'White' : keep.color }} key={id} className="keep-preview flex col space-between">
            <section className="keep-body">
                <_DynamicCmp keep={keep} onUpdateKeep={this.props.onUpdateKeep} />
            </section>
            <aside className="keep-tools">
                <button onClick={this.onShowColors}><img src="../../../assets/img/icons/color.svg" alt="Color" /></button>
                <button><img src="../../../assets/img/icons/pin.svg" alt="Pin" /></button>
                <button onClick={() => onRemoveKeep(id)}><img src="../../../assets/img/icons/delete.svg" alt="Delete" /></button>
                <button><img src="../../../assets/img/icons/send-mail.svg" alt="Mail" /></button>
            </aside>
            {this.state.showColors && <BgColor onChangeColor={this.props.onChangeColor} keepId={keep.id} />}
            {/* {this.state.showColors && <BgColor />} */}
        </article>
    }
}


// export class KeepPreview extends React.Component {

//     render() {
//         const { keep, onRemoveKeep } = this.props
//         const { type, id } = keep

//         return <article key={id} className="keep-preview flex col space-between">
//             <section className="keep-body">
//                 <_DynamicCmp keep={keep} />
//             </section>
//             <aside className="keep-tools">
//                 <button>color</button>
//                 <button>pin</button>
//                 <button onClick={() => onRemoveKeep(id)}>delete</button>
//                 <button>mail</button>
//             </aside>
//             {<BgColor />}
//         </article>
//     }
// }

function _DynamicCmp({ keep, onUpdateKeep }) {
    // console.log(type);
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