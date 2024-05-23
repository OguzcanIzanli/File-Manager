import "./Main.styles.css";

// eslint-disable-next-line react/prop-types
const Main = ({ sidebar, folderName, toolbar, content, preview }) => {
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
        <div id="contentAndPreview">
          <div id="content">{content}</div>
          <div id="preview">{preview}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
