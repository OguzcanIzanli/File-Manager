import TreeMenuItem from "./TreeMenuItem";
import "./TreeMenu.styles.css";
import { useFoldersQuery } from "../../queries/useFoldersQuery";

// eslint-disable-next-line react/prop-types
const TreeMenu = ({ parentId }) => {
  const folder = useFoldersQuery({ parentId });

  const items = folder.list.data;

  return (
    <div className="treeMenu">
      {/* eslint-disable-next-line react/prop-types */}
      {items?.map((item) => (
        <TreeMenuItem
          key={item.id}
          name={item.name}
          id={item.id}
          parentId={item.parentId}
        />
      ))}
    </div>
  );
};

export default TreeMenu;
