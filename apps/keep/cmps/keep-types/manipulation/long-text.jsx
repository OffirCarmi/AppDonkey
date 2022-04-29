export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: this.props.isLongTxtShown
    }

    textToRender = () => {
        const { txt, isLongTxtShown } = this.props
        if (!this.state.isLongTxtShown) return `${txt.substring(0, 260)}`
        else return txt
    }

    toggleMode = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    render() {
        const { isLongTxtShown } = this.state
        const { onUpdateKeep, keep } = this.props
        return <div className="keep-txt">
            <p contentEditable onBlur={() => { onUpdateKeep(event, keep.id) }} >{this.textToRender()}</p>
            <p className="dynamic" onClick={this.toggleMode} > <span>Show {(isLongTxtShown) ? 'less' : 'more...'}</span>  </p>
        </div>
    }
}