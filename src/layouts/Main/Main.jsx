import "./Main.styles.css";

const Main = ({ sidebar, folderName, toolbar, content }) => {
  return (
    <div id="container">
      <div id="sidebar">{sidebar}</div>
      <div id="contentHost">
        <div id="topNav">
          <h1 id="folderName">{folderName}</h1>
          <div id="searchHost">
            <input type="text" />
          </div>
        </div>
        <div id="toolBar">{toolbar}</div>
        <div id="content">{content}</div>
      </div>
    </div>
  );
};

export default Main;
