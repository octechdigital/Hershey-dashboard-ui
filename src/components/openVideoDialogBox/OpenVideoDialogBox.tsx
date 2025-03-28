// components/openVideoDialogBox/OpenVideoDialogBox.tsx
import React from "react";
import { Dialog, DialogContent } from "@mui/material";

interface VideoPopupProps {
  open: boolean;
  videoOnClose: () => void;
  videoUrl: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ open, videoOnClose, videoUrl }) => {
  return (
    <Dialog open={open} onClose={videoOnClose} maxWidth="md" fullWidth>
      <DialogContent>
        <video width="100%" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPopup;
