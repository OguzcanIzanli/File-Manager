import { useCallback } from "react";
import IconChevronDown from "../../assets/icons/IconChevronDown";
import IconChevronRight from "../../assets/icons/IconChevronRight";
import IconFolder from "../../assets/icons/IconFolder";
import IconFolderOpen from "../../assets/icons/IconFolderOpen";
import useBoolean from "../../hooks/useBoolean";
import TreeMenu from "./TreeMenu";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TreeMenuItem = ({ name, id, defaultExpanded }) => {
  const expanded = useBoolean(defaultExpanded || false);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/folder/" + id);
  }, []);

  return (
    <div className="treeMenuItem">
      {!expanded.value && (
        <div className="treeMenuItemRow">
          <button onClick={expanded.setTrue}>
            <IconChevronRight />
          </button>
          <span className="treeMenuRowTitle" onClick={handleClick}>
            <IconFolder className="folderIcon" />
            {name}
          </span>
        </div>
      )}

      {expanded.value && (
        <>
          <div className="treeMenuItemRow">
            <button onClick={expanded.setFalse}>
              <IconChevronDown />
            </button>
            <span className="treeMenuRowTitle" onClick={handleClick}>
              <IconFolderOpen className="folderIcon" />
              {name}
            </span>
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
