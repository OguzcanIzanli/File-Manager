import "./Folderview.styles.css";
import Main from "../../layouts/Main";
import { useFolderQuery, useFoldersQuery } from "../../queries/useFoldersQuery";
import { useParams } from "react-router-dom";
import TreeMenuItem from "../../components/TreeMenu/TreeMenuItem";

const Folderview = () => {
  const params = useParams();

  const folder = useFolderQuery(params.id);

  const name =
    !params.id || params.id === "null" ? "Kök Klasör" : folder.find.data?.name;

  const subFolders = useFoldersQuery({ parentId: params.id || "null" });
  return (
    <Main
      folderName={name}
      sidebar={
        <>
          <button className="createButton">Create</button>
          <TreeMenuItem name="Kök Klasör" id="null" defaultExpanded={true} />
        </>
      }
    />
  );
};

export default Folderview;
