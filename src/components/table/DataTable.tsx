import React, { useState } from "react";
import "./style.scss";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import OutboxOutlinedIcon from "@mui/icons-material/OutboxOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Box,
  Pagination,
  Chip,
  tableCellClasses,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Button,
} from "@mui/material";
import RejectDialog from "../reasonDialogBox/ReasonDialogBox";
import ImagePopup from "../openImageDialogBox/OpenImageDialogBox";
import axios from "axios";
import ApproveDialogeBox from "../approveDialogBox/ApproveDialogeBox";
import PageStateChip from "../pageButtons/PageStateChip";
import ReasonDialogBox from "../reasonDialogBox/ReasonDialogBox";
import { BaseUrlApi } from "../../lib/axios-instances";
import { useNavigate } from "react-router-dom";
import VideoPopup from "../openVideoDialogBox/OpenVideoDialogBox";
import ResendDialogBox from "../holdDialogBox/HoldDialogBox";
import { date } from "yup";

interface DataTableProps {
  data: Array<{
    id: number;
    invoiceNumbers: string;
    mobile: string;
    slab: string;
    winAmount: string;
    name: string;
    orderStatus: string;
    state: string;
    store: string;
    invoiceNo: string;
    noOfProducts: string;
    invoiceUrl: string;
    date: string;
    status: string;
    reason?: string;
    // rejectedReason?: string;
    url?: string;
    approvedBy: string;
    rejectedBy: string;
    preView?: string;
  }>;
  pageType: string;
  baseUrl: string;
  newPendingData: (value: boolean) => void;
  newdata: boolean;
  pageCount: number;
  crPageNo: number;
  setPageNo: (value: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  pageType,
  baseUrl,
  newPendingData,
  newdata,
  pageCount,
  setPageNo,
  crPageNo,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState<boolean>(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState("success");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // State for selected video
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false); // State for video popup
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserIdForReject, setSelectedUserIdForReject] = useState<
    number | null
  >(null);
  const [selectedUserIdForApprove, setSelectedUserIdForApprove] = useState<
    number | null
  >(null);
  const navigate = useNavigate();

  //const [page, setPage] = useState(1);
  // const rowsPerPage = 5;

  // const handleChangePage = (event: unknown, value: number) => {
  //     setPage(value);
  // };
  const handleOpenDialog = (userId: number) => {
    setSelectedUserIdForReject(userId);
    setDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setSelectedUserIdForReject(null);
    setDialogOpen(false);
  };

  const handleOpenApproveDialog = (userId: number) => {
    setSelectedUserIdForApprove(userId);
    setApproveDialogOpen(true);
  };

  const handleCloseApproveDialog = () => {
    setSelectedUserIdForApprove(null);
    setApproveDialogOpen(false);
  };

  const handleOpenReviewDialog = (userId: number) => {
    setSelectedUserIdForApprove(userId);
    setReviewDialogOpen(true);
  };

  const handleCloseReviewDialog = () => {
    setSelectedUserIdForApprove(null);
    setReviewDialogOpen(false);
  };

  // ----------

  // const handleCloseRejectDialog = () => {
  //   setSelectedUserIdForApprove(null);
  //   setApproveDialogOpen(false);
  // };

  // ------------

  // const handleSearch = (query: string) => {
  //     setSearchQuery(query);
  //     setPage(0); // Reset to the first page when searching
  // };
  const handleImageClick = (invoiceUrl: string) => {
    setSelectedImage(invoiceUrl);
    setIsImageOpen(true); // Open the image pop-up
  };
  const handleReviewClick = (invoiceUrl: string) => {
    alert("Review clicked and Go to the Pending State");
    // setSelectedImage(invoiceUrl);
    // setIsImageOpen(true); // Open the image pop-up
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsVideoOpen(true); // Open the video pop-up
  };

  const handleImageClose = () => {
    setIsImageOpen(false); // Close the image pop-up
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false); // Close the video pop-up
  };

  async function approve(userId: number | null) {
    setIsLoading(true);

    console.log("userId:", userId);
    let bodyContent = JSON.stringify({ userId: userId });
    let token = localStorage.getItem("token");
    BaseUrlApi.post(
      "/admin/approve",
      {
        userId: userId,
      },
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${token}`,
        },
      }
    )
    .then(async (response) => {
      const data = response.data;

      console.log("Raw API Response:", data);

      let decodedData;
      try {
        const base64String = data.resp;
        const jsonString = atob(base64String);
        decodedData = JSON.parse(jsonString);
      } catch (error) {
        console.error("Base64 decoding failed, using raw response:", error);
        decodedData = data;
      }

      console.log("Decoded Response:", decodedData);

      if (decodedData.statusCode === 200) {
        setSuccessMessage("Invoice approved successfully");
        setSnackbarOpen(true);
        newPendingData(!newdata);
      } else {
        console.log("Approve failed");
      }

      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      console.error("Approval API error:", error);
      if (error.response?.status) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
}

  async function review(userId: number | null) {
    setIsLoading(true);
    let bodyContent = JSON.stringify({ userId: userId });
    let token = localStorage.getItem("token");
    BaseUrlApi.post(
      "/admin/review",
      {
        userId: userId,
      },
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${token}`,
        },
      }
    )
      .then(async (response) => {
        const data = response.data;
        if (data.statusCode === 200) {
          setSuccessMessage("Undo review successful");
          setSnackbarOpen(true);
          newPendingData(!newdata);
        } else {
          console.log("Review failed");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
  }

  async function reject(userId: number | null, rejectedReason: string) {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    BaseUrlApi.post(
      "/admin/reject",
      {
        userId: userId,
        rejectedReason,
      },
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${token}`,
        },
      }
    )
      .then(async (response) => {
        const data = response.data;
        // console.log(data)
        if (data.statusCode === 200) {
          // console.log("Reject clicked for user id:", userId);
          setSuccessMessage("Invoice rejected successfully");
          setSnackbarOpen(true);
          newPendingData(!newdata);
        } else {
          console.log("Reject failed");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
  }

  // const filteredData = data.filter((row) =>
  //     row.name.toLowerCase().includes(searchQuery.toLowerCase()) || row.piCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     row.date.toLowerCase().includes(searchQuery.toLowerCase()) || row.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     row.url.toLowerCase().includes(searchQuery.toLowerCase()) || row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     row.orderStatus.toLowerCase().includes(searchQuery.toLowerCase()) || row.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  // console.log('filteredData: ', filteredData);

  const k = data.length;
  // console.log("data", data)
  // console.log("k", k)

  // Calculate the starting and ending indices for the current page
  // const startIndex = 0;
  //
  // const endIndex =  k;

  const startIndex = 0;
  const endIndex = startIndex + k;

  // console.log('startIndex: ', startIndex);
  //
  // console.log('endIndex: ', endIndex);
  // // Get the rows to display on the current page
  const pageData = data.slice(startIndex, endIndex);
  console.log("pageData", pageData);
  const onlyDate = data.slice(0, 10);
  console.log("onlyDate: ", onlyDate);

  // @ts-ignore
  return (
    <div style={{ paddingTop: "10px" }}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Name
              </TableCell>
              <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Mobile number
              </TableCell>
              <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                State
              </TableCell>
              {/* <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Mobile number
              </TableCell> */}
              {/* <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Serial Number
              </TableCell> */}
              <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Slab Number
              </TableCell>
              <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Reward Amount
              </TableCell>
              <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Date
              </TableCell>
              {/* {pageType === "approval" && (
                <TableCell
                  align={"center"}
                  sx={{
                    color: "#5F5F5F",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Approved By
                </TableCell>
              )} */}
              {/* {pageType === "rejected" && (
                <TableCell
                  align={"center"}
                  sx={{
                    color: "#5F5F5F",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Rejected By
                </TableCell>
              )} */}

              {/*<TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Invoice No
              </TableCell>*/}

              <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Invoice Image
              </TableCell>
              {/*<TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                store
              </TableCell>*/}

              {/*<TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                No Of Products
              </TableCell>*/}
              {/*<TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Date
              </TableCell>*/}

              {pageType === "rejected" && (
                <TableCell
                  align={"center"}
                  sx={{
                    color: "#5F5F5F",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Reason
                </TableCell>
              )}

              {pageType !== "approved" && (
                <TableCell
                  align={"center"}
                  sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
                >
                  Action
                </TableCell>
              )}

              {/* <TableCell
                align={"center"}
                sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
              >
                Status
              </TableCell> */}

              {/*{pageType !== "rejected" && (
                <TableCell
                  align={"center"}
                  sx={{ color: "#5F5F5F", fontSize: "18px", fontWeight: "600" }}
                >
                  Status
                </TableCell>
              )}*/}
              {/*{pageType !== "winner" && (*/}
              {/*    <TableCell align={"center"}*/}
              {/*               sx={{color: '#5F5F5F', fontSize: "18px", fontWeight: "600"}}>Registered*/}
              {/*        at</TableCell>*/}
              {/*)}*/}

              {/*{pageType === "winner" && ( // Render the extra "id" cell conditionally*/}
              {/*    <TableCell align={"center"}*/}
              {/*               sx={{color: '#5F5F5F', fontSize: "18px", fontWeight: "600"}}>Order*/}
              {/*        Id</TableCell>*/}
              {/*)}*/}
              {/*<TableCell align={"center"}*/}
              {/*           sx={{color: '#5F5F5F', fontSize: "18px", fontWeight: "600"}}>Selfie</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((row, index) => (
              <TableRow key={index} hover>
                {/*<TableCell align={"center"} sx={{borderBottom: "none"}}>{row.date}</TableCell>*/}
                <TableCell align={"center"} sx={{ borderBottom: "none" }}>
                  {row.name}
                </TableCell>
                <TableCell align={"center"} sx={{ borderBottom: "none" }}>
                  {row.mobile}
                </TableCell>
                <TableCell align={"center"} sx={{ borderBottom: "none" }}>
                  {row.state}
                </TableCell>
                {/* <TableCell align={"center"} sx={{ borderBottom: "none" }}>
                  {row.city}
                </TableCell> */}
                {/* <TableCell align={"center"} sx={{ borderBottom: "none" }}>
                  {row.invoiceNumbers}
                </TableCell> */}
                <TableCell align={"center"} sx={{ borderBottom: "none" }}>
                  {row.slab}
                </TableCell>
                {/*<TableCell
                  align={"center"}
                  sx={{ borderBottom: "none", textAlign: "center" }}
                >
                  {row.invoiceNo}
                </TableCell>*/}

                <TableCell
                  align={"center"}
                  sx={{ borderBottom: "none", textAlign: "center" }}
                >
                  {row.winAmount}
                </TableCell>
                {/* {pageType === "approval" && (
                  <TableCell
                    align={"center"}
                    sx={{
                      borderBottom: "none",
                      maxWidth: "5rem",
                    }}
                  >
                    {row.approvedBy}
                  </TableCell>
                )} */}

                {/* <TableCell
                  align={"center"}
                  sx={{ borderBottom: "none", textAlign: "center" }}
                >
                  {row.store}
                </TableCell> */}

                {/*<TableCell align={"center"} sx={{ borderBottom: "none" }}>
                  {row.noOfProducts}
              </TableCell>*/}
                <TableCell align={"center"} sx={{ borderBottom: "none" }}>
                  {row.date.slice(0, 10)}
                </TableCell>
                <TableCell align={"center"}>
                  {row.url?.includes(".mp4") ? (
                    <Button
                      onClick={() => handleVideoClick(`${baseUrl}${row.url}`)}
                    >
                      Preview
                    </Button>
                  ) : row.url?.includes(".pdf") ? (
                    <Button
                      onClick={() =>
                        window.open(`${baseUrl}${row.url}`, "_blank")
                      }
                    >
                      Preview
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleImageClick(`${baseUrl}${row.url}`)}
                    >
                      Preview
                    </Button>
                  )}
                </TableCell>
                {/* {pageType === "rejected" && (
                  <TableCell
                    align={"center"}
                    sx={{
                      borderBottom: "none",
                      maxWidth: "5rem",
                    }}
                  >
                    {row.rejectedBy}
                  </TableCell>
                )} */}

                {pageType === "rejected" && (
                  <TableCell
                    align={"center"}
                    sx={{
                      borderBottom: "none",
                      maxWidth: "5rem",
                    }}
                  >
                    {row.reason}
                  </TableCell>
                )}
                <TableCell
                  align={"center"}
                  sx={{
                    display: "flex",
                    columnGap: "5px",
                    justifyContent: "center",
                    borderBottom: "none",
                  }}
                >
                  <PageStateChip
                    pageType={pageType}
                    userId={row.id}
                    onApprove={handleOpenApproveDialog}
                    onReject={handleOpenDialog}
                    onReview={handleOpenReviewDialog}
                    winnerStatus={row.orderStatus}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReasonDialogBox
        open={dialogOpen}
        reasonOnClose={handleCloseRejectDialog}
        mainTitle={"Rejection Reason ?"}
        reasonCall={(rejectedReason) =>
          reject(selectedUserIdForReject, rejectedReason)
        }
      />
      <ApproveDialogeBox
        open={approveDialogOpen}
        onClose={handleCloseApproveDialog}
        mainTitle={"Are you sure you want to Approve ?"}
        onApprove={() => approve(selectedUserIdForApprove)}
      />
      {/* ------- */}
      <ResendDialogBox
        open={reviewDialogOpen}
        onClose={handleCloseReviewDialog}
        mainTitle={"Are you sure you want to undo last review ?"}
        onApprove={() => review(selectedUserIdForApprove)}
      />
      {/* -------- */}
      <ImagePopup
        open={isImageOpen}
        imageOnClose={handleImageClose}
        invoiceUrl={selectedImage || ""}
        style={{
          width: "someWidth",
          height: "someHeight",
          position: "absolute",
          top: "someTop",
          left: "someLeft",
          transform: "someTransform",
        }}
      />
      <VideoPopup
        open={isVideoOpen}
        videoOnClose={handleVideoClose}
        videoUrl={selectedVideo || ""}
      />{" "}
      {/* Video pop-up component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          {successMessage}
        </Alert>
      </Snackbar>
      {/* Snackbar for notifications */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          {pageType === "approve"
Invoice Approved successfully!"
            : pageType === "reject"
            ? "Request rejected successfully!"
            : "Review completed successfully!"}
        </Alert>
      </Snackbar> */}
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={pageCount}
          page={crPageNo}
          onChange={(_, page) => setPageNo(page)}
        />
      </div>
    </div>
  );
};

export default DataTable;
