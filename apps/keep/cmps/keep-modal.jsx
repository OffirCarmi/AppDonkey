export class Modal extends React.Component {

    // onClick = () => {
    //     event.stopPropagation()
    //     console.log('test');
    //     toggleModal()
    // }

    render() {
        const { keep, toggleModal } = this.props
        // if (keep.type !== 'keep-img' || keep.type !== 'keep-video') return <React.Fragment></React.Fragment>

        return <div className="screen" onClick={toggleModal}>
            <div className="modal">
                Modal
                {/* {(keep.type === 'keep-img') && <img src={keep.info.url} alt="" />}
                {(keep.type === 'keep-video') && <iframe src={keep.url} frameborder="0"></iframe>} */}
                <button onClick={toggleModal}>x</button>
            </div>
        </div>
    }
}