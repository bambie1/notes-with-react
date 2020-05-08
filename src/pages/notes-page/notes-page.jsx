import React from "react";
import "./notes-page.scss";
import Header from "../../components/header/header.component";
import MainContent from "../../components/main-content/main-content.component";

const NotesPage = () => {
  return (
    <div className="notes-page">
      <Header />
      <MainContent />
    </div>
  );
};

export default NotesPage;
