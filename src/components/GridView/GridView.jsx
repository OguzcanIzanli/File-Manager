import "./GridView.styles.css";
import { useView } from "../../context/ViewContext/ViewContext";
import { useNavigate, useParams } from "react-router-dom";
import { useFolderQuery } from "../../queries/useFoldersQuery";
import GridViewItem from "./GridViewItem";

// eslint-disable-next-line react/prop-types
const GridView = ({ files, folders }) => {
  const navigate = useNavigate();

  const params = useParams();
  const folder = useFolderQuery(params.id);

  const { clear, setSelection } = useView();

  const bulk = (e) => {
    const value = e.target.checked;

    if (value) {
      setSelection([...(folders || []), ...(files || [])]);
    } else {
      clear();
    }
  };

  return (
    <div className="gridView">
      <div
        className="gridViewItem"
        onDoubleClick={() => {
          clear();
          navigate("/folder/" + folder.find.data.parentId || "null");
        }}
      >
        <img
          src="/blue-folder.svg"
          alt="Blue Folder"
          style={{ marginLeft: 28 }}
        />
        <span>..</span>
      </div>

      {[...(folders || []), ...(files || [])].map((item) => {
        return <GridViewItem item={item} />;
      })}
    </div>
  );
};

export default GridView;
