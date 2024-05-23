import "./Folderview.styles.css";
import Main from "../../layouts/Main";
import { useFolderQuery } from "../../queries/useFoldersQuery";
import { useParams } from "react-router-dom";
import TreeMenuItem from "../../components/TreeMenu/TreeMenuItem";
import { useModal } from "../../context/ModalContext/ModalContext";
import CreateFolderModal from "../../modals/CreateFolderModal/CreateFolderModal";
import ListView from "../../components/ListView";
import GridView from "../../components/GridView";
import Toolbar from "../../components/Toolbar";
import PreviewImage from "../../components/PreviewImage";
import { useView } from "../../context/ViewContext/ViewContext";

const Folderview = () => {
  const viewContext = useView();

  const modal = useModal();
  const params = useParams();
  const folder = useFolderQuery(params.id);

  const name =
    !params.id || params.id === "null" ? "Kök Klasör" : folder.find.data?.name;

  const handleClickCreateModal = () => {
    modal.appear({
      title: "Yeni Klasör",
      children: (props) => (
        <CreateFolderModal {...props} parentFolderId={params.id} />
      ),
    });
  };

  return (
    <Main
      folderName={name}
      sidebar={
        <>
          <button onClick={handleClickCreateModal} className="createButton">
            Create
          </button>
          <TreeMenuItem name="Kök Klasör" id="null" defaultExpanded={true} />
        </>
      }
      content={
        viewContext.type === "list" ? (
          <ListView files={folder.files.data} folders={folder.list.data} />
        ) : (
          <GridView files={folder.files.data} folders={folder.list.data} />
        )
      }
      toolbar={<Toolbar />}
      preview={<PreviewImage />}
    />
  );
};

export default Folderview;
