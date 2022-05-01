export class Header extends React.Component {
    state = {
        header: null
    }

    componentDidMount() {
        this.setHeader()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.any !== this.props.match.params.any) {
            this.setHeader()
        }
    }

    setHeader = () => {
        const { any } = this.props.match.params
        this.setState({ header: any })
    }

    render() {
        const { header } = this.state
        if (!header) return <React.Fragment />
        return <header className="flex space-between align-center">
            <img onClick={() => this.props.history.push('/home')} src="assets/img/logo.png" />
            <h1>{header}</h1>
            <div className="apps" onClick={() => this.props.history.push('/home')}></div>
        </header>
    }
}