import { useMutation } from "@tanstack/react-query";
import { propsProjectData, sendProjectData } from "../api/sendProjectData/sendProjectData";

export function useProjectUpdate(id: string) {
  return useMutation({
    mutationFn: (projectData: propsProjectData["projectData"]) => 
      sendProjectData({ id, projectData }),
  });
}
