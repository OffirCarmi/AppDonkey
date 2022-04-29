import { LongTxt } from './manipulation/long-text.jsx'
import { ShortTxt } from './manipulation/short-text.jsx'

export class Txt extends React.Component {
    render() {
        const { keep, onUpdateKeep } = this.props
        const { txt } = keep.info
        return <_DynamicCmp txt={txt} onUpdateKeep={onUpdateKeep} keep={keep} />

    }
}

function _DynamicCmp({ txt, onUpdateKeep, keep }) {
    if (txt.length <= 250) return <ShortTxt txt={txt} onUpdateKeep={onUpdateKeep} keep={keep} />
    else return <LongTxt txt={txt} isLongTxtShown={false} onUpdateKeep={onUpdateKeep} keep={keep} />

}
