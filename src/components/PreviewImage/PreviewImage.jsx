import { useView } from "../../context/ViewContext/ViewContext";

const PreviewImage = () => {
  const viewContext = useView();

  if (
    viewContext.previewEye ||
    (viewContext.selectedItems.length === 1 && viewContext.selectedItems[0].url)
  ) {
    const item = viewContext.previewEye || viewContext.selectedItems[0];
    return (
      <div className="previewImageHost">
        {viewContext.previewEye && (
          <div className="xmark">
            <button onClick={() => viewContext.setPreviewEye(undefined)}>
              X
            </button>
          </div>
        )}
        <img src={item.url} />
      </div>
    );
  } else if (viewContext.selectedItems.length > 0) {
    return (
      <div>
        {viewContext.selectedItems.map((item) => (
          <p onClick={() => viewContext.deselect(item)} key={item.id}>
            {item.name}
          </p>
        ))}
      </div>
    );
  } else null;
};

export default PreviewImage;
