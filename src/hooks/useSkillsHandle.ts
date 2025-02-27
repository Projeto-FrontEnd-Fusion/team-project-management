import { useEffect, useState } from "react";

export interface Skill {
  id: string;
  name: string;
};

const useSkillsHandler = () => {
  const [hardSkills, setHardSkills] = useState<Skill[]>([]);
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);

  const fetchHardSkills = async (): Promise<Skill[]> => {
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
    fetchHardSkills().then((data) => setHardSkills(data));
    fetchSoftSkills().then((data) => setSoftSkills(data));
  }, []);

  return { hardSkills, softSkills };
};

export default useSkillsHandler;
