import { useFormik } from "formik";
import { useModal } from "../../context/ModalContext/ModalContext";
import * as yup from "yup";
import { useFolderQuery } from "../../queries/useFoldersQuery";
import "./CreateFileModal.styles.css";

// eslint-disable-next-line react/prop-types
const CreateFileModal = ({ modalId, parentFolderId }) => {
  const modal = useModal();

  const folder = useFolderQuery(parentFolderId);
  const validationSchema = yup.object({
    name: yup.string().required("isim zorunludur"),
    url: yup.string().required("url zorunludur"),
  });

  const form = useFormik({
    initialValues: { name: "", url: "" },
    validationSchema,
  });

  const parentId = parentFolderId === "null" ? null : parentFolderId || null;

  const handleOk = () => {
    form.validateForm().then((res) => {
      if (Object.keys(res).length) return;
      folder.addFile
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
            <label htmlFor="name">Dosya Adı</label>

            <input
              id="name"
              name="name"
              onChange={form.handleChange}
              value={form.values.name}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="url">Url</label>

            <input
              id="url"
              name="url"
              onChange={form.handleChange}
              value={form.values.url}
            />
          </div>
          <span className="inputError">{form.errors.url}</span>
        </form>
      </div>
      <div className="modalFooter">
        <button onClick={handleOk}>Ok</button>
      </div>
    </>
  );
};

export default CreateFileModal;
