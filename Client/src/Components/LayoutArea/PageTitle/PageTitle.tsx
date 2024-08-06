import { Typography } from "@mui/material";
import "./PageTitle.css";

interface PageTitleProps {
    title: string;
}

export function PageTitle({ title }: PageTitleProps): JSX.Element {
    return (
        <Typography className="PageTitle" gutterBottom sx={{ fontSize: '2rem' }}>
            {title}
        </Typography>
    );
}
