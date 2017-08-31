import React from "react";

import {Button, Col, Container, Row} from 'reactstrap';
import {Link} from "react-router-dom";

import ShoppingGrid from "../component/ShoppingGrid";

/**
 * TODO: refactoring ServerAPI (localstorage) to the external class and so on.
 */
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.resetLocalData = this.resetLocalData.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            itemList: []
        };
    }

    componentWillMount() {
        let storageDateSource = localStorage.getItem(this.props.storageKey);
        if (!storageDateSource) {
            storageDateSource = HomePage.generateShopList();
            localStorage.setItem(this.props.storageKey, JSON.stringify(storageDateSource));
        } else {
            storageDateSource = JSON.parse(storageDateSource);
        }
        this.setState({
            itemList: storageDateSource
        });
    }

    static generateShopList() {
        return [
            {
                "ouid": 1,
                "title": 'Title 1',
                "quantity": 1,
                "price": 20.2,
            },
            {
                "ouid": 2,
                "title": 'Title 2',
                "quantity": 20,
                "price": 10,
            },
            {
                "ouid": 3,
                "title": 'Title 3',
                "quantity": 123,
                "price": 2123.2,
            }
        ];
    }

    resetLocalData() {
        let shoppingListData = HomePage.generateShopList();
        localStorage.setItem(this.props.storageKey, JSON.stringify(shoppingListData));
        this.setState({
            itemList: shoppingListData
        });
    }

    removeItem(index) {
        let storageDateSource = localStorage.getItem(this.props.storageKey);
        let dateObject = JSON.parse(storageDateSource);
        dateObject.splice(index, 1);
        localStorage.setItem(this.props.storageKey, JSON.stringify(dateObject));
        this.setState({
            itemList: dateObject
        });
    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col><p>Welcome to the shopping list.</p></Col>
                </Row>
                <Row className={'align-items-center'}>
                    <Col sm={{ size: 'auto'}}>
                        <Button color="secondary" onClick={this.resetLocalData}>Clear data</Button>
                    </Col>
                    <Col sm={{ size: 'auto'}}>
                        <Link className="btn btn-primary my-3" to="/create.html" role="button">Add new item</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ShoppingGrid data={this.state.itemList} onRemove={this.removeItem}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

HomePage.defaultProps = {
    storageKey: 'shoppingListData'
};
