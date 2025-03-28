import "./style.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "../../../../components/table/DataTable";
import { BaseUrlApi } from "../../../../lib/axios-instances";
import { useNavigate } from "react-router-dom";

export default function WinnerSection() {
  interface WinnerSectionProps {
    id: number;
    invoiceNumbers:string;
    slab:string;
    mobile: string;
    name: string;
    orderStatus: string;
    state: string;
    store: string;
    winAmount:string;
    approvedBy:string;
    rejectedBy:string;

    invoiceNo: string;
    noOfProducts: string;
    invoiceUrl: string;
    date: string;
    status: string;
  }

  const [pendingData, setPendingData] = useState<WinnerSectionProps[] | null>(
    null
  );
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [newData, setNewData] = useState<boolean>(false);
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState<number>(1);

  const WinnerSectionData = async () => {
    let token = localStorage.getItem("token");
    BaseUrlApi.get(`/admin/getWinners?pageNo=${pageNo}`, {
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
        console.log("appror: ", error.response.status);
        if (error.response.status) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
  };
  useEffect(() => {
    WinnerSectionData();
  }, [newData, pageNo]);
  return (
    <div className="winnerSection">
      <h1>Winner Page</h1>
      {pendingData !== null ? (
        <DataTable
          data={pendingData}
          pageType={"winner"}
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
