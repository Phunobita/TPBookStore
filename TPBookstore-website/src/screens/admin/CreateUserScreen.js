import React from "react";
import Sidebar from "./../../components/admin/Sidebar";
import Header from "./../../components/admin/Header";
import CreateUser from "../../components/admin/users/CreateUser";

const CreateUserScreen = ({ history }) => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <CreateUser history={history} />
      </main>
    </>
  );
};

export default CreateUserScreen;
