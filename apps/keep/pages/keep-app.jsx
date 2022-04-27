import { keepService } from '../services/keep.service.js'
import { KeepList } from '../cmps/keep-list.jsx'

export class Keep extends React.Component {
    state = {
        keeps: [],
        type: '',
        txt: '',
    }

    componentDidMount() {
        this.loadKeeps()
    }

    loadKeeps = () => {
        keepService.query()
            .then(keeps => {
                this.setState({ keeps })
            })
    }

    onAddKeep = () => {
        event.preventDefault()
        const txt = this.state.txt
        const type = (event.target[1].checked) ? 'txt' : (event.target[2].checked) ? 'img' : 'list'
        console.log(txt, type);
        keepService.addKeep(txt, type)
            .then(this.loadKeeps())
        this.setState((prevState) => ({ ...prevState, txt: '' }))
    }

    onRemoveKeep = (keepId) => {
        keepService.removeKeep(keepId)
            .then(() => this.loadKeeps())
    }

    handleChange = ({ target }) => {
        const txt = target.value
        this.setState((prevState) => ({ ...prevState, txt }))

    }

    render() {
        const { keeps, txt } = this.state
        return <section className="keep-app">
            <div className="new-keep">
                <form className="flex space-between" onSubmit={() => this.onAddKeep()}>
                    <input type="text" value={txt} onChange={this.handleChange} placeholder="Take a KEEP..." />
                    <div className="keep-type">
                        <label htmlFor="txt">TXT</label>
                        <input type="radio" id="txt" name="type" value="txt" defaultChecked />
                        <label htmlFor="img">IMG</label>
                        <input type="radio" id="img" name="type" value="img" />
                        <label htmlFor="list">LST</label>
                        <input type="radio" id="list" name="type" value="list" />
                    </div>
                </form>
            </div>
            <KeepList
                keeps={keeps}
                onRemoveKeep={this.onRemoveKeep} />
        </section>
    }
}