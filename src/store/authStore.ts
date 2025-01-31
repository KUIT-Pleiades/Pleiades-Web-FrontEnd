import { create } from "zustand";
//모든페이지에서 const { authorization } = useAuth(); 해서 액세스토큰 받아와야함
interface Auth {
  authorization: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuth = create<Auth>((set) => ({
  authorization: "null",
  setToken: (token) => {
    set(() => ({ authorization: token }));
  },
  clearToken: () => {
    set({ authorization: null });
    //로그아웃 시 리프레시토큰 삭제요청도 서버에 보내야함
  },
}));
