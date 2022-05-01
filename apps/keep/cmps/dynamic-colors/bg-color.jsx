export class BgColor extends React.Component {
    state = {
        color: ''
    }

    onClick = (keepId, color) => {
        this.props.onChangeColor(keepId, color)
        this.props.toggleColors()
    }

    tester = (event) => { console.log('tester', event); }

    render() {
        const colors = ['#ff696180', '#ffb58080',
            '#f8f38d80', '#42d6a580',
            '#08cad180', '#59adf680',
            '#9d94ff80', '#c780e880', '#fff']
        const { toggleColors, keepId } = this.props
        return <div onBlur={(event) => console.log(event)} className="colors-container flex align-center space-between">
            {colors.map(color => {
                return <div onClick={() => this.onClick(keepId, color)}
                    style={{ backgroundColor: color }} key={color} className="color"> </div>
            })}
        </div>
    }

}
