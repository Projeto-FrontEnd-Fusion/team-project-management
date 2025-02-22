import { useEffect, useState } from "react";

type Skill = {
  id: string;
  name: string;
};

const useSkillsHandler = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);

  const fetchSkills = async (): Promise<Skill[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'JavaScript' },
          { id: '2', name: 'React' },
          { id: '3', name: 'Node.js' },
        ]);
      }, 1000);
    });
  };

  const fetchSoftSkills = async (): Promise<Skill[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '4', name: 'Comunicação' },
          { id: '5', name: 'Trabalho em equipe' },
          { id: '6', name: 'Liderança' },
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    fetchSkills().then((data) => setSkills(data));
    fetchSoftSkills().then((data) => setSoftSkills(data));
  }, []);

  return { skills, softSkills };
};

export default useSkillsHandler;
