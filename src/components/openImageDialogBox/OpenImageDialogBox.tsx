import React from 'react';
import './style.scss';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

interface ImagePopupProps {
    open: boolean;
    imageOnClose: () => void;
    invoiceUrl: string;
    style: {
        width: string;
        height: string;
        position: 'absolute' | 'relative' | 'static';
        top: string;
        left: string;
        transform: string;
    };
}

const ImagePopup: React.FC<ImagePopupProps> = ({ open, imageOnClose, invoiceUrl, style }) => {
    const className = 'image-popup';

    const handleDownload = async () => {
        if (invoiceUrl) {
            try {
                const response = await fetch(invoiceUrl);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
    
                const link = document.createElement('a');
                link.href = url;
                link.download = 'invoice-image';
    
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
    
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading the file:", error);
            }
        }
    };
    

    // const handleDownload = () => {
    //     const link = document.createElement('a');
    //     link.href = invoiceUrl;
    //     link.download = 'invoice-image.png';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     // const link = document.createElement('a');
    //     // link.href = invoiceUrl;
    //     // link.download = 'invoice-image'; // Set the download filename
    //     // link.click();
    // };

    return (
        <Dialog
            className={className}
            open={open}
            onClose={imageOnClose}
            disableEscapeKeyDown
            style={style}
        >
            <DialogContent>
                <img src={invoiceUrl} alt="Image" />
            </DialogContent>
            <IconButton
                aria-label="Close"
                color="error"
                onClick={imageOnClose}
                sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: "#000000" }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button variant="contained" color="primary" onClick={handleDownload}>
                    Download
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ImagePopup;
