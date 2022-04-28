import { LongTxt } from './manipulation/long-text.jsx'
import { ShortTxt } from './manipulation/short-text.jsx'

export class Txt extends React.Component {
    render() {
        const { keep } = this.props
        const { txt } = keep.info
        return <_DynamicCmp txt={txt} />

    }
}

function _DynamicCmp({ txt }) {
    if (txt.length <= 250) return <ShortTxt txt={txt} />
    else return <LongTxt txt={txt} isLongTxtShown={false} />

}
