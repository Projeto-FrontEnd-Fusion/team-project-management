import { create } from "zustand";

interface MemberState {
  memberId: string | null;
  setMemberId: (id: string) => void;
}

export const useMemberStore = create<MemberState>((set) => ({
  memberId: null,
  setMemberId: (id) => set({ memberId: id }),
}));
