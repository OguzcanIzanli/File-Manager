import backend from "../services/backend";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export const useFoldersQuery = (query) => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const list = useQuery({
    queryKey: ["folders", query],
    queryFn: () =>
      backend.folderService.list(query).then((res) => res.data.result),
  });

  return { list };
};

export const useFolderQuery = (id) => {
  const find = useQuery({
    queryKey: ["folder", id],
    queryFn: () => backend.folderService.find(id).then((res) => res.data),
    enabled: Boolean(id),
  });

  return { find };
};
