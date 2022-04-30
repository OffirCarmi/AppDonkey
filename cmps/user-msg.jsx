import { eventBusService } from "../services/event-bus.service.js"

export class UserMsg extends React.Component {

    state = {
        msg: ''
    }

    removeEvent;
    timeoutId;

    componentDidMount() {
        this.removeEvent = eventBusService.on('user-msg', (msg) => {
            console.log('msg from event listener', msg);
            this.setState({ msg })
            if (this.timeoutId) clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(this.onCloseMsg, 3000)
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    onCloseMsg = () => {
        this.setState({ msg: null })
        clearTimeout(this.timeoutId)
    }

    render() {
        const { msg } = this.state
        if (!msg) return <React.Fragment></React.Fragment>
        return <div className={`user-msg ${msg.type} flex`}>
            <button onClick={this.onCloseMsg}>X</button>
            <p className="msg">{msg.txt}</p>
        </div>
    }
}