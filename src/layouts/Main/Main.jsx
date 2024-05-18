import "./Main.styles.css";

const Main = () => {
  return (
    <div id="container">
      <div id="sideBar"></div>
      <div id="contentHost">
        <div id="topNav">
          <h1 id="folderName">Folder Name</h1>
          <div id="searchHost">
            <input type="text" />
          </div>
        </div>
        <div id="toolBar"></div>
        <div id="content"></div>
      </div>
    </div>
  );
};

export default Main;
