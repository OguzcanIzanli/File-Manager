import backend from "../services/backend";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const useFolderQuery = (id) => {
  const queryClient = useQueryClient();

  const find = useQuery({
    queryKey: ["folder", id],
    queryFn: () => backend.folderService.find(id).then((res) => res.data),
    enabled: Boolean(id) && id !== "null",
  });

  const query = { parentId: id || "null" };
  const list = useQuery({
    queryKey: ["folders", query],
    queryFn: () =>
      backend.folderService.list(query).then((res) => res.data.result),
  });

  const addSubFolder = useMutation({
    mutationFn: (values) => backend.folderService.create(values),
    onSuccess: ({ data }, values, unknown2) => {
      queryClient.invalidateQueries({ queryKey: ["folders", query] });
      console.log(data, values, unknown2);
    },
  });

  return { find, list, addSubFolder };
};
