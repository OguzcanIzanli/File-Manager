import { useNavigate } from "react-router-dom";
import { useView } from "../../context/ViewContext/ViewContext";
import IconEye from "../../assets/icons/IconEye";

const GridViewItem = ({ item }) => {
  const { select, deselect, itemIsSelected, clear, setPreviewEye } = useView();

  const navigate = useNavigate();

  const handleSelectionChange = (e, item) => {
    const value = e.target.checked;
    value ? select(item) : deselect(item);
  };

  return (
    <div
      onClick={
        item.url
          ? () => {
              setPreviewEye(item);
            }
          : undefined
      }
      key={item.id}
      className="gridViewItem"
      onDoubleClick={
        !item.url
          ? () => {
              clear();
              navigate("/folder/" + item.id);
            }
          : undefined
      }
    >
      <input
        type="checkbox"
        checked={Boolean(itemIsSelected(item))}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleSelectionChange(e, item)}
      />
      <img src={item.url || "/blue-folder.svg"} alt="Blue Folder" />
      <span>{item.name}</span>
    </div>
  );
};

export default GridViewItem;
