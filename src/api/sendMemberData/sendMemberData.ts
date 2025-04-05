import { formMemberData } from "../../schema/schemaFormValidation";
import { api } from "../axiosInstance";

export const sendMemberData = async (formData: formMemberData) => {
  const dataToSend = new FormData();

  if (formData.profileImage && formData.profileImage.length > 0) {
    dataToSend.append("profileImage", formData.profileImage[0]);
  }

  dataToSend.append("name", formData.name);
  dataToSend.append("stack", formData.stack);
  dataToSend.append("level", formData.level);

  formData.professionalProfiles.forEach((profile, index) => {
    dataToSend.append(`professionalProfiles[${index}][url]`, profile.url);
    dataToSend.append(`professionalProfiles[${index}][platform]`, profile.platform);
  });

  formData.skills.forEach((skill, index) => {
    dataToSend.append(`skills[${index}]`, skill);
  });

  formData.softSkills.forEach((skill, index) => {
    dataToSend.append(`softSkills[${index}]`, skill);
  });

  const { data } = await api.post("/members", dataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
