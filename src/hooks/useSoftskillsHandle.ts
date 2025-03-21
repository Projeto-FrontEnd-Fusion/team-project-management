import { useQuery } from "@tanstack/react-query";
import { getSoftskills } from "../api/handleSkills/getSoftskills";

const useSoftskillsHandler = () => {
  return useQuery({
    queryKey: ["softskills"],
    queryFn: getSoftskills
  });  
};

export default useSoftskillsHandler;