import React, { Component } from "react";
import {
    Typography,
    Button,
    Avatar,
    CardActions,
    IconButton,
    CardContent,
    Grid,
    Link,
    Card,
    CardHeader
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Label from "./Label";

export default class ProjectCard extends Component {
    constructor(props) {
        super(props);
        // this.state = { ...this.props, isChanged: false };
    }

    render() {
        console.log(this.props);
        return (
            <Card>
                <CardHeader
                    style={{ paddingBottom: 0 }}
                    title={<Link href="">{this.props.project.name}</Link>}
                    subheader={`от ${this.props.project.author.name} | ${this.props.project.date}`}
                    avatar={<Avatar>{this.props.project.author.image}ß</Avatar>}
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Typography variant="subtitle2">
                                {this.props.project.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {this.props.project.categories.map(category => (
                                <Label
                                    color={category.color}
                                    key={category.name}
                                    style={{ marginLeft: 3 }}
                                >
                                    {category.name}{" "}
                                </Label>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions disableSpacing style={{ paddingTop: 0 }}>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton>
                        <ShareIcon />
                    </IconButton>
                    <Button>Узнать больше</Button>
                </CardActions>
            </Card>
        );
    }
}
