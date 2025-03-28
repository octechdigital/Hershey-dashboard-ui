import { Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import './style.scss';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';


interface ApproveDialogeBoxProps {
    open: boolean;
    onClose: () => void;
    onApprove: () => void;
    mainTitle: string;

}


const ApproveDialogeBox = ({open,onClose,mainTitle,onApprove}:ApproveDialogeBoxProps) => {

  
    const onCloseDialog = () => {
        onClose();
    };

    const handleApprove = () => {
        onApprove(); // Call the approval function
        onClose(); // Close the dialog after approval
    }
    return(
      <Dialog open={open} onClose={onCloseDialog} >
          <DialogTitle>{mainTitle}</DialogTitle>

          <DialogActions>

              <IconButton onClick={handleApprove} aria-label="Yes" size="large" color="success">
                  <DoneOutlinedIcon/>
              </IconButton>


              <IconButton onClick={onClose} aria-label="No" size="large" color="error">
                  <CloseOutlinedIcon/>
              </IconButton>
          </DialogActions>


      </Dialog>
  )
}

export default ApproveDialogeBox;