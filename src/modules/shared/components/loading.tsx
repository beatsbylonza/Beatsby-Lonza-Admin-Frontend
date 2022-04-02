
import {Dialog, DialogContent, CircularProgress, Backdrop} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    topScrollPaper: {
      alignItems: "flex-start"
    },
    topPaperScrollBody: {
      verticalAlign: "top"
    }
  });

  
export default function Loading(props: any){
    const { open } = props;
    
    return (
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    );
}