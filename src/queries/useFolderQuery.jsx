import backend from "../services/backend";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const useFolderQuery = (query) => {
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

export default useFolderQuery;
