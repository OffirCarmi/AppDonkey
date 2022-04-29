export class ShortTxt extends React.Component {
    render() {
        const { txt, onUpdateKeep, keep } = this.props;
        return <div className="keep-txt">
            <p contentEditable onBlur={() => { onUpdateKeep(event, keep.id) }}>{txt}</p>
        </div>
    }
}