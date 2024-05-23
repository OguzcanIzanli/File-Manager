import IconTrash3 from "../../assets/icons/IconTrash";
import { useView } from "../../context/ViewContext/ViewContext";
import { useFolderQuery } from "../../queries/useFoldersQuery";
import "./Toolbar.styles.css";
import { useParams } from "react-router-dom";
import CreateFolderModal from "../../modals/CreateFolderModal/CreateFolderModal";
import CreateFileModal from "../../modals/CreateFileModal/CreateFileModal";
import { useModal } from "../../context/ModalContext/ModalContext";

const Toolbar = () => {
  const viewContext = useView();
  const isSelected = Boolean(viewContext.selectedItems.length);

  const params = useParams();
  const folder = useFolderQuery(params.id);

  const modal = useModal();

  const handleRemoveSelected = () => {
    const files = viewContext.selectedItems.filter((i) => Boolean(i.url));
    const folders = viewContext.selectedItems.filter((i) => !i.url);

    files.forEach((file) => {
      folder.removeFile.mutateAsync(file.id);
    });

    folders.forEach((f) => {
      folder.removeFolder.mutateAsync(f.id);
    });
  };

  const handleClickCreateModal = () => {
    modal.appear({
      title: "Yeni Klasör",
      children: (props) => (
        <CreateFolderModal {...props} parentFolderId={params.id} />
      ),
    });
  };

  const handleClickCreateFileModal = () => {
    modal.appear({
      title: "Yeni Dosya",
      children: (props) => (
        <CreateFileModal {...props} parentFolderId={params.id} />
      ),
    });
  };

  return (
    <div className="toolbar">
      <button onClick={viewContext.toggleType}>Görünümü Değiştir</button>
      <button onClick={handleClickCreateModal}>Yeni Klasör</button>
      <button onClick={handleClickCreateFileModal}>Yeni Dosya</button>

      {isSelected && (
        <button onClick={handleRemoveSelected}>
          <IconTrash3 />
        </button>
      )}
    </div>
  );
};

export default Toolbar;
