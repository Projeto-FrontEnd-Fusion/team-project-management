import { useMutation } from "@tanstack/react-query";
import { useMemberStore } from "../store/useMemberStore";
import { sendMemberData } from "../api/sendMemberData/sendMemberData";

export const useSubmitMemberForm = () => {
  const setMemberId = useMemberStore((state) => state.setMemberId);

  return useMutation({
    mutationFn: sendMemberData,
    onSuccess: (data) => {
      setMemberId(data.id);
    },
  });
};
