import React from "react";
import {Button, Col, Container, Form, FormText, Input, InputGroup, InputGroupAddon, Label, Row} from 'reactstrap';
import {Link} from "react-router-dom";
import Binder from 'react-binding';


export default class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.saveData = this.saveData.bind(this);

        this.state = {
            data: {},
            isNew: false,
            title: '',
            message: null,
            error: false
        };
    }

    componentWillMount() {
        let title;
        let isNew;
        if (this.props.match.params.ouid) {
            title = "Edit item";
            isNew = false;

            let storageDateSource = localStorage.getItem(this.props.storageKey);
            let dateObject = JSON.parse(storageDateSource);
            let currentItem = null;
            for (let item of dateObject) {
                if (item.ouid === parseInt(this.props.match.params.ouid)) {
                    currentItem = item;
                    break;
                }
            }
            if (currentItem !== null) {


                this.setState({
                    title: title,
                    isNew: isNew,
                    data: currentItem
                })
            } else {
                this.setState({
                    message: 'Item not found',
                    error: true
                });
            }
        } else {
            title = "Create new item";
            isNew = true;
            this.setState({
                title: title,
                isNew: isNew
            })
        }

    }

    saveData() {
        if (this.checkData()) {
            let storageDateSource = localStorage.getItem(this.props.storageKey);
            let dateObject = JSON.parse(storageDateSource);
            if (this.state.isNew) {
                let currentItem = this.state.data;
                currentItem.ouid = Math.max.apply(Math, dateObject.map(function (o) {
                    return o.ouid;
                })) + 1;
                dateObject.push(currentItem);
                localStorage.setItem(this.props.storageKey, JSON.stringify(dateObject));
            } else {
                let currentItem = this.state.data;
                let index = -1;
                let i = 0;
                for (let item of dateObject) {
                    if (item.ouid === currentItem.ouid) {
                        index = i;
                        break;
                    }
                    i++;
                }
                dateObject[index] = currentItem;
                localStorage.setItem(this.props.storageKey, JSON.stringify(dateObject));
            }
            this.setState({
                message: 'Data saved.'
            });
        } else {
            this.setState({
                message: 'Error in the form'
            });
        }
    }

    /**
     * Very simple validation.
     * @returns {boolean}
     */
    checkData() {
        let data = this.state.data;
        return data.title !== "" && data.quantity !== "" && data.price !== "";
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>{this.state.title}</h1><br/>
                        {this.state.message !== null ? <p>{this.state.message}</p> : null}
                        <Link className="btn btn-secondary my-3" to="/" role="button">Shopping List</Link>
                    </Col>
                </Row>

                {!this.state.error ?
                    <Row>
                        <Col>
                            <Row>
                                <Col sm={{size: 'auto'}}>
                                    <Button color="success" onClick={this.saveData}>Save data</Button>
                                </Col>
                            </Row>
                            <Form className="pt-3">
                                <Row>
                                    <Col xs="6">
                                        <InputGroup>
                                            <InputGroupAddon>Title</InputGroupAddon>
                                            <Input type="text" name="title" id="txtTitle" placeholder="enter item title"
                                                   valueLink={Binder.bindToState(this, "data", "title")}/>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="pt-1">
                                    <Col xs="6">
                                        <InputGroup>
                                            <InputGroupAddon>Quantity</InputGroupAddon>
                                            <Input type="number" name="quantity" id="txtQuantity" placeholder="enter item quantity"
                                                   valueLink={Binder.bindToState(this, "data", "quantity")}/>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="pt-1">
                                    <Col xs="6">
                                        <InputGroup>
                                            <InputGroupAddon>Price</InputGroupAddon>
                                            <Input type="number" name="price" id="txtPrice" placeholder="enter item price"
                                                   valueLink={Binder.bindToState(this, "data", "price")}/>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    : null}

            </Container>
        )
    }
}

DetailPage.defaultProps = {
    storageKey: 'shoppingListData'
};