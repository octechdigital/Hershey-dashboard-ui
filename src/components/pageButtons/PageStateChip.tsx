import React from "react";
import Chip from "@mui/material/Chip";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import OutboxOutlinedIcon from "@mui/icons-material/OutboxOutlined";

interface PageStateChipProps {
  pageType: string;
  userId: number;
  winnerStatus: any;
  onApprove: (userId: number) => void;
  onReject: (userId: number) => void;
  onReview: (userId: number) => void;
}

const PageStateChip: React.FC<PageStateChipProps> = ({
  pageType,
  userId,
  onApprove,
  onReject,
  onReview,
  winnerStatus,
}) => {
  // debugger
  console.log(userId, pageType);
  if (pageType === "pending") {
    return (
      <>
        <Chip
          icon={<DoneAllOutlinedIcon />}
          onClick={() => onApprove(userId)}
          label="Approve"
          variant="outlined"
          color="success"
          sx={{ cursor: "pointer" }}
        />
        <Chip
          onClick={() => onReject(userId)}
          icon={<CancelOutlinedIcon />}
          label="Reject"
          variant="outlined"
          color="error"
          sx={{ cursor: "pointer" }}
        />
        
      </>
    );
  } else if (pageType === "approval") {
    return (
      <p className={"approval-btn"}>
        <span>
          <DoneAllOutlinedIcon />
        </span>{" "}
        Approved
      </p>
    );
  } else if (pageType === "rejected") {
    return (
      <Chip
        onClick={() => onReview(userId)}
        icon={<OutboxOutlinedIcon />}
        label="Undo"
        variant="outlined"
        color="error"
        sx={{ cursor: "pointer" }}
      />
    );
  } else if (pageType === "winner") {
    return <p>{winnerStatus}</p>;
  } else {
    return <></>;
  }
};

export default PageStateChip;
