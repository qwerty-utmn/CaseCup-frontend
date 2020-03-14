import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Toolbar, AppBar, Grid } from "@material-ui/core";
import { white } from "material-ui/styles/colors";

export default class ProjectCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar position="static" style={{ marginBottom: "20px" }}>
                <Toolbar>
                    <Grid container>
                        <Grid item>
                            <RouterLink to="/">
                                <Typography variant="h2" style={{ color: white }}>Title</Typography>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}
