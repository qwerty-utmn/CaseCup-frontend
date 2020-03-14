import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Grid,
    Typography,
    OutlinedInput,
    ListItem,
    ListItemAvatar,
    Avatar,
    List,
    CardActions,
    Button,
    FormControl,
    TextField,
    CardHeader,
    Card,
    CardContent,
    InputLabel,
    Select,
    Chip,
    ListItemText,
    Checkbox,
    MenuItem,
    Container
} from "@material-ui/core";
import { white } from "material-ui/styles/colors";

class ProjectCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategories: []
        };
    }

    render() {
        const categories = ["cat1", "cat2", "cat3"];

        return (
            <Container>
                <Grid container direction="column" spacing={3}>
                    <Grid item sm>
                        <Typography variant="overline" gutterBottom>
                            Новый проект
						</Typography>
                        <Typography variant="h3">Cоздание проекта</Typography>
                    </Grid>
                    <Grid item>
                        <Card>
                            <CardHeader title="Информация" />
                            <CardContent>
                                <Grid container item direction="column" spacing={3}>
                                    <Grid item>
                                        <TextField
                                            label="Название"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControl fullWidth variant="outlined" margin="dense">
                                            <InputLabel shrink style={{ background: white }}>
                                                Категории
											</InputLabel>
                                            <Select
                                                multiple
                                                value={this.state.selectedCategories}
                                                onChange={e => {
                                                    this.setState({ selectedCategories: e.target.value });
                                                }}
                                                // renderValue={selected => selected.join(', ')}
                                                renderValue={selected => (
                                                    <div>
                                                        {selected.map(value => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </div>
                                                )}
                                                MenuProps={{
                                                    MenuListProps: {
                                                        style: {
                                                            maxHeight: 250,
                                                            padding: 0
                                                        }
                                                    },
                                                    getContentAnchorEl: null,
                                                    anchorOrigin: {
                                                        vertical: "bottom",
                                                        horizontal: "left"
                                                    },
                                                    transformOrigin: {
                                                        vertical: "top",
                                                        horizontal: "left"
                                                    }
                                                }}
                                            >
                                                {categories.map(cat => (
                                                    <MenuItem key={cat} value={cat}>
                                                        <Checkbox
                                                            checked={
                                                                this.state.selectedCategories.indexOf(cat) > -1
                                                            }
                                                        />
                                                        <ListItemText primary={cat} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Описание"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item>
                                            <FormControl variant="outlined" margin="dense">
                                                <InputLabel shrink>Обложка проекта</InputLabel>
                                                <OutlinedInput
                                                    type="file"
                                                    notched
                                                    labelWidth={136}
                                                    inputProps={{
                                                        accept: "image/*",
                                                        id: "raised-button-file"
                                                    }}
                                                ></OutlinedInput>
                                                {/* <label htmlFor="raised-button-file">
                                                    <Button variant="raised" component="span" >
                                                        Upload
                                                    </Button>
                                                </label> */}
                                            </FormControl>
                                            {/* <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button variant="raised" component="span" >
                                                    Upload
                                            </Button>
                                            </label> */}
                                        </Grid>
                                        <Grid item>
                                            <FormControl variant="outlined" margin="dense">
                                                <InputLabel shrink>Дополнительные файлы</InputLabel>
                                                <OutlinedInput
                                                    type="file"
                                                    notched
                                                    multiple
                                                    labelWidth={136}
                                                    inputProps={{
                                                        accept: ".doc,.pdf,.excel,.csv,.xml",
                                                        id: "raised-button-file"
                                                    }}
                                                ></OutlinedInput>
                                                {/* <label htmlFor="raised-button-file">
                                                    <Button variant="raised" component="span" >
                                                        Upload
                                                    </Button>
                                                </label> */}
                                            </FormControl>
                                            {/* <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button variant="raised" component="span" >
                                                    Upload
                                            </Button>
                                            </label> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card margin="dense">
                            <CardHeader style={{ paddingBottom: 0 }} title="Участники" />
                            <CardContent>
                                <List>
                                    <ListItem key="1" alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar>H</Avatar>
                                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Holand"
                                            secondary="Front End Developer"
                                        />
                                    </ListItem>
                                    <ListItem key="1" alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar>H</Avatar>
                                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Holand"
                                            secondary="Front End Developer"
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button fullWidth>Управлять</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
const mapStateToProps = store => {
    return {
        // project: store.project
    };
};
const mapDispatchToProps = dispatch => {
    return {
        // login: (username, password) => dispatch(login(username, password)),
        // signup: (username, password) => dispatch(signup(username, password)),
        // logout: () => dispatch(logout()),
        // removeErrors: () => dispatch(removeErrors())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreation);
