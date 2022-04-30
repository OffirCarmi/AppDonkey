export class Modal extends React.Component {

    onClick = () => {
        event.stopPropagation()
        console.log('close')
    }

    render() {
        return <div className="screen" onClick={this.onClick}>
            <div className="modal">
                <button onClick={this.onClick}>x</button>
            </div>
        </div>
    }
}