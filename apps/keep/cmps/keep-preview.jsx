const { Link } = ReactRouterDOM

export class KeepPreview extends React.Component {

    render() {
        const { keep } = this.props
        const { type } = keep
        switch (type) {
            case 'keep-txt':

                break;
            case 'keep-img':

                break;
            case 'keep-todos':

                break;

        }
        return <article className="keep-preview flex col space-between">
            <section className="keep-type">{type}</section>
            <main className="keep-body">body</main>
            <aside className="keep-tools">tools</aside>
        </article>
    }
}