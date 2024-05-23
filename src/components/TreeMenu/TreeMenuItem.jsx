import { useCallback } from "react";
import IconChevronDown from "../../assets/icons/IconChevronDown";
import IconChevronRight from "../../assets/icons/IconChevronRight";
import IconFolder from "../../assets/icons/IconFolder";
import IconFolderOpen from "../../assets/icons/IconFolderOpen";
import useBoolean from "../../hooks/useBoolean";
import TreeMenu from "./TreeMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useView } from "../../context/ViewContext/ViewContext";

// eslint-disable-next-line react/prop-types
const TreeMenuItem = ({ name, id, defaultExpanded }) => {
  const expanded = useBoolean(defaultExpanded || false);
  const navigate = useNavigate();
  const params = useParams();
  const { clear } = useView();

  const handleClick = useCallback(() => {
    navigate("/folder/" + id);
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCurrent = params.id === id;
  const Icon = isCurrent ? IconFolderOpen : IconFolder;
  const fontWeight = isCurrent ? "bold" : "normal";

  return (
    <div className="treeMenuItem">
      {!expanded.value && (
        <div className="treeMenuItemRow">
          <button onClick={expanded.setTrue}>
            <IconChevronRight />
          </button>
          <span
            className="treeMenuRowTitle"
            style={{ fontWeight }}
            onClick={handleClick}
          >
            <Icon className="folderIcon" />
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
            <span
              className="treeMenuRowTitle"
              style={{ fontWeight }}
              onClick={handleClick}
            >
              <Icon className="folderIcon" />
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
