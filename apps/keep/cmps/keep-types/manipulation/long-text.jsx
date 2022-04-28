export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: this.props.isLongTxtShown
    }

    textToRender = () => {
        const { txt, isLongTxtShown } = this.props
        if (!this.state.isLongTxtShown) return `${txt.substring(0, 200)}`
        else return txt
    }

    toggleMode = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    // render() {
    //     const { txt } = this.props;
    //     return <div className="keep-txt">
    //         <textarea name="" id="" cols="25" rows="10">{txt}</textarea>
    //     </div>
    // }
    render() {
        // console.log(this.props);
        const { isLongTxtShown } = this.state
        return <section className='keep-txt'>
            <p >{this.textToRender()}</p>
            <p className="dynamic" onClick={this.toggleMode}> <span>Show {(isLongTxtShown) ? 'less' : 'more...'}</span>  </p>
        </section>
    }
}


{/* <p className='keep-txt'>{this.textToRender()}</p>

<p className='dynamic' onClick={this.toggleMode}> <span>Show {(isLongTxtShown) ? 'less' : 'more...'}</span>  </p> */}
