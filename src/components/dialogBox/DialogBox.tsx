import React, {useState} from 'react';
import './style.scss'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import {IconButton} from "@mui/material";
import ReasonDialogBox from "../reasonDialogBox/ReasonDialogBox";

interface TitleDialogProps {
    open: boolean;
    onClose: () => void;
    mainTitle: string;

}

const RejectDialog: React.FC<TitleDialogProps> = ({open, onClose, mainTitle}) => {
    const [reasonDialog, SetReasonDialog] = useState<boolean>(false);

    const handleReasonOpenDialog = () => {
        SetReasonDialog(true);
    };

    const handleReasonCloseDialog = () => {
        SetReasonDialog(false);
        onClose();
    };
    const openCloseFn = () => {

        SetReasonDialog(true);
    };
    const onCloseDialog = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onCloseDialog} >
            <DialogTitle>{mainTitle}</DialogTitle>

            <DialogActions>

                <IconButton onClick={openCloseFn} aria-label="Yes" size="large" color="success">
                    <DoneOutlinedIcon/>
                </IconButton>


                <IconButton onClick={onClose} aria-label="No" size="large" color="error">
                    <CloseOutlinedIcon/>
                </IconButton>
            </DialogActions>

            {/* <ReasonDialogBox  reasonOnClose={handleReasonCloseDialog} open={reasonDialog}/> */}

        </Dialog>
    );
};

export default RejectDialog;
