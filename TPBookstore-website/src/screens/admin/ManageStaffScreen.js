import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ManageStaff from "../../components/admin/users/ManageStaff";

const ManageStaffScreen = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";
  const page = queryParams.get("p") || "";
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ManageStaff keyword={keyword} pageNumber={page} />
      </main>
    </>
  );
};

export default ManageStaffScreen;
