import { keepService } from '../services/keep.service.js'
import {KeepList} from '../cmps/keep-list.jsx'

export class Keep extends React.Component {
    state = {
        keeps: [],
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

    render() {
        const { keeps } = this.state
        return <section className="keep-app">
            <form>
            <input type="text" />
            </form>
            <KeepList
                keeps={keeps} />
        </section>
    }
}