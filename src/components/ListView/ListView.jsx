import { useState } from "react";
import "./ListView.styles.css";

// eslint-disable-next-line react/prop-types
const ListView = ({ files, folders }) => {
  const [selectecItems, setSelectedItems] = useState([]);

  const handleSelectionChange = (e, id) => {
    console.log(e);
    console.log(id);
  };

  return (
    <div className="listView">
      <div className="listViewTitle">
        <input type="checkbox" />
        <span>Name</span>
      </div>

      {/* eslint-disable-next-line react/prop-types */}
      {folders?.map((item) => {
        return (
          <div key={item.id} className="listViewItem">
            <input
              type="checkbox"
              onChange={(e) => handleSelectionChange(e, item.id)}
            />
            <img src="/blue-folder.svg" alt="Blue Folder" />
            <span>{item.name}</span>
          </div>
        );
      })}

      {/* eslint-disable-next-line react/prop-types */}
      {files?.map((item) => {
        return (
          <div key={item.id} className="listViewItem">
            <input
              type="checkbox"
              onChange={(e) => handleSelectionChange(e, item.id)}
            />
            <img src={item.url} alt="Blue Folder" />
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
