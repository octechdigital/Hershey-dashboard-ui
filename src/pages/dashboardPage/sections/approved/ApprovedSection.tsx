import "./style.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "../../../../components/table/DataTable";
import { BaseUrlApi } from "../../../../lib/axios-instances";
import { useNavigate } from "react-router-dom";

export default function ApprovedSection() {
  interface ApprovalSectionProps {
    id: number;
    invoiceNumbers:string;
    mobile: string;
    slab:string;
    winAmount:string;
    name: string;
    orderStatus: string;
    state: string;
    store: string;
    invoiceNo: string;
    noOfProducts: string;
    invoiceUrl: string;
    date: string;
    status: string;
    approvedBy	:string;
    rejectedBy	:string;


    // piCode: string,
    // time: string,
    // url: string,
    // orderId: string,
  }

  const [pendingData, setPendingData] = useState<ApprovalSectionProps[] | null>(
    null
  );
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [newData, setNewData] = useState<boolean>(false);
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState<number>(1);

  const ApprovedSectionData = async () => {
    let token = localStorage.getItem("token");
    BaseUrlApi.get(`/admin/getApprovedUsers?pageNo=${pageNo}`, {
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
      method: "get",
    })
      .then(async (response) => {
        const data = response.data;
        // console.log("Response data: ", data);
        if (data.statusCode === 200) {
          // console.log("success")
          setPendingData(data.data.userList);
          setBaseUrl(data.data.baseUrl);
          setPageCount(data.data.pageCount);
        } else {
          console.log("Login failed");
        }
      })
      .catch((error) => {
        if (error.response.status) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
  };


  useEffect(() => {
    ApprovedSectionData();
  }, [newData, pageNo]);
  return (
    <div className="approvedSection">
      <h1>Approved Page</h1>
      {pendingData !== null ? (
        <DataTable
          data={pendingData}
          pageType={"approval"}
          baseUrl={baseUrl}
          newPendingData={setNewData}
          newdata={newData}
          pageCount={pageCount}
          setPageNo={setPageNo}
          crPageNo={pageNo}
        />
      ) : (
        <span />
      )}
    </div>
  );
}
