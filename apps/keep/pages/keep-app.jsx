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
        // console.log('input', input);
        // console.log('type', type);
        keepService.addKeep(input, type)
            .then(this.loadKeeps())
    }

    onRemoveKeep = (keepId) => {
        keepService.removeKeep(keepId)
            .then(() => this.loadKeeps())
    }

    handleChange = ({ target }) => {
        // console.log('input is', target.value);
        const input = target.value
        this.setState((prevState) => ({ ...prevState, input }))

    }

    changeType = ({ target }) => {
        console.log('type is', target.value);
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
        }

    }

    render() {
        const { input, placeholder, keeps } = this.state

        return <section className="keep-app">
            <div className="new-keep">
                <form className="flex space-between align-center" onSubmit={() => this.onAddKeep()}>
                    <input class="input" type="text" value={input} onChange={this.handleChange} placeholder={placeholder} />
                    <div className="keep-type flex">
                        <label htmlFor="keep-txt">TXT</label>
                        <input type="radio" id="keep-txt" name="type" value="keep-txt" onChange={this.changeType} defaultChecked />
                        <label htmlFor="keep-img">IMG</label>
                        <input type="radio" id="keep-img" name="type" value="keep-img" onChange={this.changeType} />
                        <label htmlFor="keep-todos">LST</label>
                        <input type="radio" id="keep-todos" name="type" value="keep-todos" onChange={this.changeType} />
                    </div>
                </form>
            </div>
            <KeepList
                keeps={keeps}
                onRemoveKeep={this.onRemoveKeep} />
        </section>
    }
}