import { keepService } from '../services/keep.service.js'
import { KeepList } from '../cmps/keep-list.jsx'
import { Modal } from '../cmps/keep-modal.jsx'
import { eventBusService } from '../../../services/event-bus.service.jsx'
import { Loader } from "../../../cmps/loader.jsx";

export class Keep extends React.Component {
    state = {
        keeps: [],
        type: 'keep-txt',
        input: '',
        placeholder: 'Write a new text KEEP'
    }

    componentDidMount() {
        setTimeout(() => {
            this.loadKeeps()
        }, 1500);
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
        if (!input) return

        const type = this.state.type
        keepService.addKeep(input, type)
            .then(() => {
                this.loadKeeps()
                eventBusService.emit('user-msg', { txt: 'New Keep was added', type: 'success' })
            })

    }

    onRemoveKeep = (keepId) => {
        keepService.removeKeep(keepId)
            .then(() => {
                this.loadKeeps()
                eventBusService.emit('user-msg', { txt: 'Keep was deleted', type: 'success' })
            })

    }

    onChangeColor = (keepId, color) => {
        console.log('test');
        event.stopPropagation()
        keepService.changeColor(keepId, color)
            .then(this.loadKeeps())
    }

    onUpdateKeep(ev, keepId, todoId) {
        eventBusService.emit('user-msg', { txt: 'Keep was updated', type: 'success' })
        keepService.updateKeep(ev.target.innerText, keepId, todoId)
            .then(() => this.loadKeeps())
    }

    onDuplicateKeep = (keepId) => {
        keepService.duplicateKeep(keepId)
            .then(() => this.loadKeeps())
    }

    onPinKeep = (keepId) => {
        keepService.pinKeep(keepId)
            .then(() => this.loadKeeps())

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
                    <button className="btn-new-txt" onClick={() => this.changeType('keep-txt')}></button>
                    <button className="btn-new-img" onClick={() => this.changeType('keep-img')}></button>
                    <button className="btn-new-todos" onClick={() => this.changeType('keep-todos')}></button>
                    <button className="btn-new-video" onClick={() => this.changeType('keep-video')}></button>
                </div>
            </div>
            {(keeps.length === 0) && <Loader keeps={keeps} />}
            {/* {(keeps.length === 0) && <h6>No Keeps to show <br />
                <span> Go ahead and create a new Keep</span></h6>} */}

            <KeepList
                keeps={keeps}
                onRemoveKeep={this.onRemoveKeep}
                onChangeColor={this.onChangeColor}
                onUpdateKeep={this.onUpdateKeep}
                onDuplicateKeep={this.onDuplicateKeep}
                onPinKeep={this.onPinKeep} />

            {/* <Modal /> */}
        </section>
    }
}

    // get pinnedKeeps() {
    //     const { keeps } = this.state
    //     const pinnedKeeps = keeps.filter(keep => keep.isPinned)
    //     if (!pinnedKeeps) return
    // }