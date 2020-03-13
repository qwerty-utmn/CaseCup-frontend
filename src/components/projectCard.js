import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export class Sneaker extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props, isChanged: false };
    }
    onChangeModel = e => {
        this.setState({
            model: e.target.value
        });
        this.setState({
            isChanged: true
        });
    };

    onChangeBrand = e => {
        this.setState({
            brand: e.target.value
        });
        this.setState({
            isChanged: true
        });
    };
    onUpdate(id, sneaker) {
        if (this.state.isChanged) this.props.onUpdate(id, sneaker);
    }
    render() {
        return (
            <TableRow>
                <TableCell>
                    <TextField
                        fullWidth
                        value={this.state.model}
                        onChange={this.onChangeModel}
                    // onBlur={this.handleBlur}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        value={this.state.brand}
                        onChange={this.onChangeBrand}
                    // onBlur={this.handleBlur}
                    />
                </TableCell>
                <TableCell width="100px">
                    <ButtonGroup color="secondary">
                        <Button onClick={() => this.props.onDelete(this.state._id)}>
                            Удалить
						</Button>
                        <Button
                            onClick={() =>
                                this.onUpdate(this.state._id, {
                                    model: this.state.model,
                                    brand: this.state.brand
                                })
                            }
                        >
                            Изменить
						</Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
        );
    }
}
