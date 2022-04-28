import { keepService } from '../services/keep.service.js'
import { KeepList } from '../cmps/keep-list.jsx'

export class Keep extends React.Component {
    state = {
        keeps: [],
        type: 'keep-txt',
        input: '',
        placeholder: 'Write a new KEEP'
    }

    componentDidMount() {
        this.loadKeeps()
    }

    loadKeeps = () => {
        keepService.query()
            .then(keeps => {
                this.setState({ keeps, type: 'keep-txt', input: '', placeholder: 'Write a new KEEP' })
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

    handleChange = ({ target }) => {
        const input = target.value
        this.setState((prevState) => ({ ...prevState, input }))

    }

    changeType = ({ target }) => {
        const type = target.value
        switch (type) {
            case 'keep-txt':
                this.setState((prevState) => ({ ...prevState, type: 'keep-txt', placeholder: 'Write a new KEEP' }))
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

        return <section className="keep-app">
            <div className="new-keep">
                <form className="flex space-between align-center" onSubmit={() => this.onAddKeep()}>
                    <input className="input" type="text" value={input} onChange={this.handleChange} placeholder={placeholder} />
                    <div className="keep-type flex">
                        <label htmlFor="keep-txt">TXT</label>
                        <input type="radio" id="keep-txt" name="type" value="keep-txt" onChange={this.changeType} defaultChecked />
                        <label htmlFor="keep-img">IMG</label>
                        <input type="radio" id="keep-img" name="type" value="keep-img" onChange={this.changeType} />
                        <label htmlFor="keep-todos">LST</label>
                        <input type="radio" id="keep-todos" name="type" value="keep-todos" onChange={this.changeType} />
                        <label htmlFor="keep-video">YT</label>
                        <input type="radio" id="keep-video" name="type" value="keep-video" onChange={this.changeType} />
                    </div>
                </form>
            </div>
            <KeepList
                keeps={keeps}
                onRemoveKeep={this.onRemoveKeep} />
        </section>
    }
}