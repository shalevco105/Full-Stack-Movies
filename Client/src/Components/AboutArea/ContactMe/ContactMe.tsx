import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import "./ContactMe.css";
import { PageTitle } from "../../LayoutArea/PageTitle/PageTitle";

export function ContactMe(): JSX.Element {
    return (
        <div className="ContactMe">
            <PageTitle title="Contact Me" />
            <form>
                <Typography variant="h4">Contact Me - This form does noting</Typography>
                <TextField type="text" label="Full Name" />
                <TextField type="email" label="Email" />
                <TextField type="tel" label="Phone" />
                <TextField type="text" label="Message" multiline rows={5} />
                <FormControlLabel label="checkbox" control={<Checkbox />} />
                <ButtonGroup fullWidth variant="contained">
                    <Button type="button" color="primary">Send</Button>
                    <Button type="reset" color="secondary">Clear</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}
