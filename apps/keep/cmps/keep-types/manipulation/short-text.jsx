export class ShortTxt extends React.Component {
    render() {
        const { txt } = this.props;
        return <div className="keep-txt">
            <p>{txt}</p>
        </div>
    }
}