import { createContext, useState, useContext } from "react";

const ViewContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const ViewProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [previewEye, setPreviewEye] = useState(undefined);
  const [type, setType] = useState("list");

  const toggleType = () => {
    setType((prev) => (prev === "list" ? "grid" : "list"));
  };

  const select = (item) => {
    setSelectedItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const deselect = (item) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const clear = () => {
    setSelectedItems([]);
  };

  const itemIsSelected = (item) => {
    return selectedItems.find((i) => i.id === item.id);
  };

  const setSelection = (items) => {
    setSelectedItems(items);
  };

  return (
    <ViewContext.Provider
      value={{
        selectedItems,
        select,
        deselect,
        clear,
        itemIsSelected,
        setSelection,
        previewEye,
        setPreviewEye,
        toggleType,
        type,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useView = () => {
  const value = useContext(ViewContext);
  if (!value) {
    throw new Error("useView must be used within a ViewProvider");
  }

  return value;
};
