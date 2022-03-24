
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
    const classes = useStyles();
  

    return (
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
        // <Dialog open={open} 
        // scroll="paper" 
        // classes={{
        //   scrollPaper: classes.topScrollPaper,
        //   paperScrollBody: classes.topPaperScrollBody
        // }}>
        //     <DialogContent style={{width: '200px', display: 'flex', justifyContent: 'center'}}>
        //         <CircularProgress />
        //     </DialogContent>
        // </Dialog>
    );
}