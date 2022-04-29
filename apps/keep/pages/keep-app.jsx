import { keepService } from '../services/keep.service.js'
import { KeepList } from '../cmps/keep-list.jsx'
import { Modal } from '../cmps/keep-modal.jsx'
import { KeepCreate } from '../cmps/keep-create/keep-create.jsx'

export class Keep extends React.Component {
    state = {
        keeps: [],
        type: 'keep-txt',
        input: '',
        placeholder: 'Write a new text KEEP'
    }

    componentDidMount() {
        this.loadKeeps()
    }

    loadKeeps = () => {
        keepService.query()
            .then(keeps => {
                this.setState({ keeps, type: 'keep-txt', input: '', placeholder: 'Write a text new KEEP' })
            })
    }

    onAddKeep = () => {
        event.preventDefault()
        const input = this.state.input
        const type = this.state.type
        keepService.addKeep(input, type)
            .then(this.loadKeeps())

    }

    onRemoveKeep = (keepId) => {
        keepService.removeKeep(keepId)
            .then(() => this.loadKeeps())
    }

    onChangeColor = (keepId, color) => {
        event.stopPropagation()
        keepService.changeColor(keepId, color)
            .then(() => this.loadKeeps())
    }

    onUpdateKeep(ev, keepId, todoId) {
        keepService.updateKeep(ev.target.innerText, keepId, todoId)

    }


    handleChange = ({ target }) => {
        const input = target.value
        this.setState((prevState) => ({ ...prevState, input }))

    }

    changeType = (type) => {
        event.stopPropagation()
        switch (type) {
            case 'keep-txt':
                this.setState((prevState) => ({ ...prevState, type: 'keep-txt', placeholder: 'Write a new text KEEP' }))
                break
            case 'keep-img':
                this.setState((prevState) => ({ ...prevState, type: 'keep-img', placeholder: 'Enter image URL' }))
                break
            case 'keep-todos':
                this.setState((prevState) => ({ ...prevState, type: 'keep-todos', placeholder: 'Enter comma seperated list' }))
                break
            case 'keep-video':
                this.setState((prevState) => ({ ...prevState, type: 'keep-video', placeholder: 'Enter YouTube URL' }))
                break
        }

    }

    render() {
        const { type, input, placeholder, keeps } = this.state

        return <section className="keep-app flex col space-between">
            <div className="new-keep flex space-between align-center">
                <form onSubmit={() => this.onAddKeep()}>
                    <input className="input" type="text" value={input} onChange={this.handleChange} placeholder={placeholder} />
                </form>
                <div className="keep-type flex">
                    <button onClick={() => this.changeType('keep-txt')}><img src="../../../assets/img/icons/type-txt.svg" alt="" /></button>
                    <button onClick={() => this.changeType('keep-img')}><img src="../../../assets/img/icons/type-img.svg" alt="" /></button>
                    <button onClick={() => this.changeType('keep-todos')}><img src="../../../assets/img/icons/type-list.svg" alt="" /></button>
                    <button onClick={() => this.changeType('keep-video')}><img src="../../../assets/img/icons/type-youtube.svg" alt="" /></button>
                </div>
            </div>
            <KeepList
                keeps={keeps}
                onRemoveKeep={this.onRemoveKeep}
                onChangeColor={this.onChangeColor}
                onUpdateKeep={this.onUpdateKeep} />

            {/* <Modal /> */}
        </section>
    }
}