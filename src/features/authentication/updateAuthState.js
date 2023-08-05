import { decodeToken } from "react-jwt";
import { store } from "../../app/store";
import { setIsLoggedIn, setUserInfo, setToken } from "./authSlice";

export const updateAuthStateLogin = (token) => {
  const myDecodedToken = decodeToken(token);
  // console.log(myDecodedToken);
  store.dispatch(setIsLoggedIn(true));
  store.dispatch(
    setUserInfo({
      id: myDecodedToken.userId,
      name: myDecodedToken.userName,
      lastName: myDecodedToken.userLastName,
      role: myDecodedToken.userRole,
      customerId: myDecodedToken.customerId,
      doctorId: myDecodedToken.doctorId,
    })
  );
  store.dispatch(setToken(token));
};

export const updateAuthStateLogout = () => {
  store.dispatch(setIsLoggedIn(false));
  store.dispatch(
    setUserInfo({
      id: null,
      name: null,
      role: null,
    })
  );
  store.dispatch(setToken(null));
};
