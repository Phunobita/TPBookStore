import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import StaffDetails from "../../components/admin/users/StaffDetails";

const StaffDetailsScreen = ({ match }) => {
  const userId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <StaffDetails userId={userId} />
      </main>
    </>
  );
};

export default StaffDetailsScreen;
