import { LocalKey, LocalStorage } from "ts-localstorage";
import { JWT } from "../hooks/auth.hook.interface";

export const getIsAuth = () => {
  const storageName = "userData" as LocalKey<JWT>;
  const userData = LocalStorage.getItem(storageName);
  if (userData) {
    return userData.token.data.access;
  }
  return null;
};
