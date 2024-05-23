import backend from "../services/backend";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const useFolderQuery = (id) => {
  const queryClient = useQueryClient();
  const query = { parentId: id || "null" };

  const find = useQuery({
    queryKey: ["folder", id],
    queryFn: () => backend.folderService.find(id).then((res) => res.data),
    enabled: Boolean(id) && id !== "null",
  });

  const list = useQuery({
    queryKey: ["folders", query],
    queryFn: () =>
      backend.folderService.list(query).then((res) => res.data.result),
  });

  const files = useQuery({
    queryKey: ["files", query],
    queryFn: () =>
      backend.fileService.list(query).then((res) => res.data.result),
    enabled: Boolean(id) && id !== "null",
  });

  const addSubFolder = useMutation({
    mutationFn: (values) => backend.folderService.create(values),
    onSuccess: ({ data }, values, unknown2) => {
      queryClient.invalidateQueries({ queryKey: ["folders", query] });
      console.log(data, values, unknown2);
    },
  });

  const addFile = useMutation({
    mutationFn: (values) => backend.fileService.create(values),
    onSuccess: ({ data }, values, unknown2) => {
      queryClient.invalidateQueries({ queryKey: ["files", query] });
      console.log(data, values, unknown2);
    },
  });

  const removeFolder = useMutation({
    mutationFn: (id) => backend.folderService.remove(id),
    onSuccess: ({ data }, values, unknown2) => {
      queryClient.invalidateQueries({ queryKey: ["folders", query] });
      console.log(data, values, unknown2);
    },
  });

  const removeFile = useMutation({
    mutationFn: (id) => backend.fileService.remove(id),
    onSuccess: ({ data }, values, unknown2) => {
      queryClient.invalidateQueries({ queryKey: ["files", query] });
      console.log(data, values, unknown2);
    },
  });

  return { find, list, addSubFolder, files, removeFile, removeFolder, addFile };
};
