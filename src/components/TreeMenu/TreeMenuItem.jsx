import IconChevronDown from "../../assets/icons/IconChevronDown";
import IconChevronRight from "../../assets/icons/IconChevronRight";
import IconFolder from "../../assets/icons/IconFolder";
import IconFolderOpen from "../../assets/icons/IconFolderOpen";
import useBoolean from "../../hooks/useBoolean";
import TreeMenu from "./TreeMenu";

// eslint-disable-next-line react/prop-types
const TreeMenuItem = ({ name, id, parentId }) => {
  const expanded = useBoolean(false);

  return (
    <div className="treeMenuItem">
      {!expanded.value && (
        <div className="treeMenuItemRow">
          <button onClick={expanded.setTrue}>
            <IconChevronRight />
          </button>
          <IconFolder />
          {name}
        </div>
      )}

      {expanded.value && (
        <>
          <div className="treeMenuItemRow">
            <button onClick={expanded.setFalse}>
              <IconChevronDown />
            </button>
            <IconFolderOpen />
            {name}
          </div>
          <div className="treeMenuSub">
            <TreeMenu parentId={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default TreeMenuItem;
