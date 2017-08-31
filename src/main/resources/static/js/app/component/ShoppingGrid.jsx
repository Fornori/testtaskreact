import React from "react";
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';
import ShopItem from "./ShopItem";

export default class ShoppingGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let itemList = this.props.data.map((object, index) => {
            return <ShopItem key={object.ouid} data={object} itemIndex={index} onRemove={this.props.onRemove}/>
        });

        return (
            <div>
                <h3>Total items: {this.props.data.length}</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList}
                    </tbody>
                </Table>
            </div>
        )
    }
}

ShoppingGrid.propTypes = {
    data: PropTypes.array.isRequired
};