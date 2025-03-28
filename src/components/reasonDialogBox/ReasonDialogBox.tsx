import React, { useEffect, useState } from "react";
import "./style.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { IconButton } from "@mui/material";

interface TitleDialogProps {
  open: boolean;
  mainTitle: string;
  reasonOnClose: () => void;
  reasonCall: (reason: string) => void;
}

const ReasonDialogBox: React.FC<TitleDialogProps> = ({
  open,
  reasonOnClose,
  reasonCall,
  mainTitle,
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedReason !== "Other") {
      setReason(selectedReason);
    } else {
      setReason(""); // Allow user input if "Other" is selected
    }
  }, [selectedReason]);

  // Reset selectedReason, reason, and error when dialog closes
  const handleClose = () => {
    setSelectedReason("");
    setReason("");
    setError("");
    reasonOnClose();
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReason(event.target.value);
    setError(""); // Clear error when a reason is selected
  };

  const handleReasonTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const hasReasonCall = () => {
    if (!selectedReason) {
      setError("Please select a reason.");
      return;
    }
    reasonCall(reason);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {mainTitle}
        <IconButton
          aria-label="Close"
          size="large"
          color="error"
          onClick={handleClose}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <select
          name="reason"
          onChange={handleReasonChange}
          value={selectedReason}
        >
          <option value="" disabled hidden>
            Choose here
          </option>
          <option value="Blurred Images">Blurred Images</option>
          <option value="Incorrect battery quantity">Incorrect Slab</option>
          <option value="No dealer stamp">No dealer stamp</option>
          <option value="Serial number not matching">Inappropriate Image</option>
          <option value="Other">Other</option>
        </select>
        {error && <p className="error-text">{error}</p>}
        {selectedReason === "Other" && (
          <textarea
            name="otherReason"
            rows={4}
            cols={50}
            value={reason}
            onChange={handleReasonTextChange}
            placeholder="Please specify the reason"
          />
        )}
      </DialogContent>
      <DialogActions>
        <button type="submit" className="reason-btn" onClick={hasReasonCall}>
          Submit
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ReasonDialogBox;
