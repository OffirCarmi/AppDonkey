import { KeepPreview } from '../cmps/keep-preview.jsx'


export function KeepList(props) {

    const { keeps } = props
    const pinnedKeeps = keeps.filter(keep => keep.isPinned)
    const unpinnedKeeps = keeps.filter(keep => !keep.isPinned)

    // console.log(pinnedKeeps.length);
    // console.log(unpinnedKeeps.length);

    return <section className="keep-list" >
        <section className="pinned-keeps">
            {pinnedKeeps.length > 0 && <p>PINNED</p>}
            {pinnedKeeps.map(keep => <KeepPreview
                keep={keep}
                key={keep.id}
                onRemoveKeep={props.onRemoveKeep}
                onChangeColor={props.onChangeColor}
                onUpdateKeep={props.onUpdateKeep}
                onDuplicateKeep={props.onDuplicateKeep}
                onPinKeep={props.onPinKeep} />)}
        </section>
        {/* {pinnedKeeps.length > 0 && <hr />} */}
        <section className="unpinned-keeps">
        {/* {unpinnedKeeps.length > 0 && <h3>OTHERS</h3>} */}
            {unpinnedKeeps.map(keep => <KeepPreview
                keep={keep}
                key={keep.id}
                onRemoveKeep={props.onRemoveKeep}
                onChangeColor={props.onChangeColor}
                onUpdateKeep={props.onUpdateKeep}
                onDuplicateKeep={props.onDuplicateKeep}
                onPinKeep={props.onPinKeep} />)}
        </section >
    </section>


    {/* <section className="pinned-keep">
{unpinnedKeeps.map(keep => <KeepPreview
            keep={keep}
            key={keep.id}
            onRemoveKeep={onRemoveKeep}
            onChangeColor={this.props.onChangeColor}
            onUpdateKeep={this.props.onUpdateKeep}
            onDuplicateKeep={this.props.onDuplicateKeep} />}
</section> */}

}

// export class KeepList extends React.Component {

//     // state = {
//     //     pinnedNum: 0
//     // }

//     // componentDidMount() {
//     //     const { keeps } = this.props
//     //     console.log(keeps);



//     // }



//     render() {
//         const { keeps, onRemoveKeep } = this.props
//         return <section className="keep-list">
//             {/* {pinned.map} */}

//             {keeps.map(keep => <KeepPreview
//                 keep={keep}
//                 key={keep.id}
//                 onRemoveKeep={onRemoveKeep}
//                 onChangeColor={this.props.onChangeColor}
//                 onUpdateKeep={this.props.onUpdateKeep}
//                 onDuplicateKeep={this.props.onDuplicateKeep} />)}

//         </section>
//     }
// }