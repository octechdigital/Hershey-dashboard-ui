import "./style.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../../components/table/DataTable";
import { BaseUrlApi } from "../../../../lib/axios-instances";
import { useNavigate } from "react-router-dom";

export default function RejectedSection() {
  interface RejectedSectionProps {
    id: number;
    invoiceNumbers:string;
    mobile: string;
    name: string;
    slab:string;
    orderStatus: string;
    state: string;
    store: string;
    winAmount:string;
    invoiceNo: string;
    noOfProducts: string;
    invoiceUrl: string;
    date: string;
    status: string;
    reason: string;
    approvedBy:string;
    rejectedBy:string;
  }
  const [pendingData, setPendingData] = useState<RejectedSectionProps[] | null>(
    null
  );
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>("");
  const [newData, setNewData] = useState<boolean>(false);
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState<number>(1);

  const RejectedSectionData = async () => {
    let token = localStorage.getItem("token");
    BaseUrlApi.get(`/admin/getRejectedUsers?pageNo=${pageNo}`, {
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
          setOrderId(data.data.userList.piCode);
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
    RejectedSectionData();
  }, [newData, pageNo]);

  return (
    <div className="rejectedSection" key={"rejected"}>
      <h1>Rejected Page</h1>
      {pendingData !== null ? (
        <DataTable
          data={pendingData}
          pageType={"rejected"}
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
