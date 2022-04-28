export class Header extends React.Component {
    state = {

    }

    render() {
        return <header className="flex space-between align-center">
            <img src="../assets/img/logo.png" />
            <h1>AppDonkey</h1>
            <div className="apps"></div>
        </header>
    }
}