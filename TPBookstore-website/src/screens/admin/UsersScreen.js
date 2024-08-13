import React from "react";
import Sidebar from "./../../components/admin/Sidebar";
import Header from "./../../components/admin/Header";
import UserListComponent from "../../components/admin/users/UserListComponent";

const UsersScreen = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";
  const page = queryParams.get("p") || "";
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserListComponent keyword={keyword} pageNumber={page} />
      </main>
    </>
  );
};

export default UsersScreen;
