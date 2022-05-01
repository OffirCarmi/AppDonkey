export class ShortTxt extends React.Component {
    render() {
        const { txt, onUpdateKeep, keep } = this.props;
        return <div className="keep-txt">
            <p className="editable" contentEditable onBlur={() => { onUpdateKeep(event, keep.id) }}>{txt}</p>
        </div>
    }
}