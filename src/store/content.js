// import { atom } from 'nanostores';
import { persistentAtom } from "@nanostores/persistent";
// 创建一个类似 Jotai atom 的存储
// export const contentStore = atom(false);
export const contentStore = persistentAtom("user:loggedIn", false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

