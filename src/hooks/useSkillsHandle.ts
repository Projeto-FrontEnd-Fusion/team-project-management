import { useQuery } from "@tanstack/react-query";
import { getSkills } from "../api/handleSkills/getSkills";

const useSkillsHandler = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills
  });  
};

export default useSkillsHandler;
