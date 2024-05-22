import { useFormik } from "formik";
import { useModal } from "../../context/ModalContext/ModalContext";
import * as yup from "yup";
import { useFolderQuery } from "../../queries/useFoldersQuery";

// eslint-disable-next-line react/prop-types
const CreateFolderModal = ({ modalId, parentFolderId }) => {
  const modal = useModal();

  const folder = useFolderQuery(parentFolderId);
  const validationSchema = yup.object({
    name: yup.string().required("isim zorunludur"),
  });

  const form = useFormik({
    initialValues: { name: "" },
    validationSchema,
  });

  const parentId = parentFolderId === "null" ? null : parentFolderId || null;

  const handleOk = () => {
    form.validateForm().then((res) => {
      if (Object.keys(res).length) return;
      folder.addSubFolder
        .mutateAsync({
          ...form.values,
          parentId,
        })
        .then(() => {
          modal.disappear(modalId);
        });
    });
  };
  return (
    <>
      <div className="modalBody">
        <form onSubmit={form.handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Klasör Adı</label>

            <input
              id="name"
              name="name"
              onChange={form.handleChange}
              value={form.values.email}
            />
          </div>
          <span className="inputError">{form.errors.name}</span>
        </form>
      </div>
      <div className="modalFooter">
        <button onClick={handleOk}>Ok</button>
      </div>
    </>
  );
};

export default CreateFolderModal;
