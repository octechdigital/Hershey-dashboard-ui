import "./style.scss";
import DataTable from "../../../../components/table/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrlApi } from "../../../../lib/axios-instances";
import { useNavigate } from "react-router-dom";

export default function PendingSection() {
  interface PendingSectionProps {
    id: number;
    invoiceNumbers:string;
    mobile: string;
    slab:string;
    name: string;
    orderStatus: string;
    state: string;
    store: string;
    winAmount:string;

    invoiceNo: string;
    noOfProducts: string;
    invoiceUrl: string;
    date: string;
    status: string;
    approvedBy:string;
    rejectedBy:string;
  }

  const [pendingData, setPendingData] = useState<PendingSectionProps[] | null>(
    null
  );
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [newData, setNewData] = useState<boolean>(false);
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState<number>(1);

  const PendingSectionData = async () => {
    let token = localStorage.getItem("token");
    BaseUrlApi.get(`/admin/getPendingUsers?pageNo=${pageNo}`, {
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
          console.log(data.data.baseUrl);
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
    PendingSectionData();
  }, [newData, pageNo]);
  return (
    <div className="pendingSection">
      <h1>Pending Page</h1>
      {pendingData !== null ? (
        <DataTable
          data={pendingData}
          pageType={"pending"}
          baseUrl={baseUrl}
          newPendingData={setNewData}
          newdata={newData}
          pageCount={pageCount}
          crPageNo={pageNo}
          setPageNo={setPageNo}
        />
      ) : (
        <span />
      )}
    </div>
  );
}
