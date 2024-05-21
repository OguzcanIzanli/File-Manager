import "./App.css";
import Main from "./layouts/Main";
import TreeMenu from "./components/TreeMenu";

function App() {
  return (
    <>
      <Main
        folderName="Folder Name"
        sidebar={
          <>
            <TreeMenu parentId="null" />
          </>
        }
      />
    </>
  );
}

export default App;
