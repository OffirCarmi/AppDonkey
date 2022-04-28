// export class ShortTxt extends React.Component {
//     render() {
//         const { txt } = this.props;
//         return <div className="keep-txt">
//             <textarea name="" id="" cols="25" rows="10">{txt}</textarea>
//         </div>
//     }
// }
export class ShortTxt extends React.Component {
    render() {
        const { txt } = this.props;
        return <div className="keep-txt">
            <p>{txt}</p>
        </div>
    }
}