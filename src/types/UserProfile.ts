interface ProfessionalProfile {
  platform: string;
  url: string;
}

interface Project {
  project_cover: string;
  project_name: string;
  description: string;
  technologies_used: string[];
  project_url: string;
}

export interface UserProfile {
  name: string;
  professional_profile_url: ProfessionalProfile[];
  stack: string;
  community_level: string;
  current_squad: string;
  skills: string[];
  projects: Project[];
  softskills: string[];
}
