import { LongTxt } from './manipulation/long-text.jsx'
import { ShortTxt } from './manipulation/short-text.jsx'

export class Txt extends React.Component {
    render() {
        const { keep } = this.props
        const { txt } = keep.info
        // console.log(txt);
        return <div className="keep-txt">
            <_DynamicCmp txt={txt} />
        </div>
    }
}

function _DynamicCmp({ txt }) {

    // console.log(txt.length);

    if (txt.length <= 200) return <ShortTxt txt={txt} />
    else return <LongTxt txt={txt} isLongTxtShown={false} />

}


{/* <LongTxt txt={keep.info.txt} isLongTxtShown={false} /> */ }
