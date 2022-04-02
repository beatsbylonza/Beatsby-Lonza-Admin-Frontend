import { Dialog } from "@mui/material";
import { withStyles } from "@mui/styles";

const StyledDialog = withStyles({
    root: {
        position: 'fixed',
        zIndex: '7 !important',
        right: '0px',
        bottom: '0px',
        top: '0px',
        left: '0px'
    }
})(Dialog);
  

export default function BeatsByLonzaDialog(props: any){
    const { open, children } = props;

    return (
        <StyledDialog open={open} fullWidth={true} maxWidth='xl'>
            {children}
        </StyledDialog>
    )
}