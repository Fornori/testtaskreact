import React from "react";
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";

export default class ShopItem extends React.Component {
    constructor(props) {
        super(props);
    }

    round(number, precision) {
        let factor = Math.pow(10, precision);
        let tempNumber = number * factor;
        let roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    render() {
        return (
            <tr>
                <td>{this.props.data.ouid}</td>
                <td>{this.props.data.title}</td>
                <td>{this.props.data.quantity}</td>
                <td>{this.props.data.price}</td>
                <td>{(this.isNumeric(this.props.data.quantity) && this.isNumeric(this.props.data.price)) ? this.round(this.props.data.quantity * this.props.data.price, 2) : "error parse data"}</td>
                <td>
                    <Link className="btn btn-primary" to={'/detail/' + this.props.data.ouid + '.html'} role="button">Edit</Link>
                    <Button color="danger" onClick={()=>this.props.onRemove(this.props.index)} style={{marginLeft: '5px'}}>Remove</Button>
                </td>
            </tr>
        )
    }
}

ShopItem.defaultProps = {
    storageKey: 'shoppingListData'
};

ShopItem.propTypes = {
    data: PropTypes.object.isRequired
};