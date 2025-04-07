import { useMutation } from "@tanstack/react-query";
import { useMemberStore } from "../store/useMemberStore";
import { sendMemberData } from "../api/sendMemberData/sendMemberData";
import { useNavigate } from "react-router-dom";

export const useSubmitMemberForm = () => {
  const setMemberId = useMemberStore((state) => state.setMemberId);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: sendMemberData,
    onSuccess: (data) => {
      setMemberId(data.id);
      navigate('/projects');
    },
  });
};
