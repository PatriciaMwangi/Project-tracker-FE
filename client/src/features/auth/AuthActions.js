import { auth, googleProvider } from '../../FirebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { setUser, clearUser } from './AuthSlice';

export const loginWithGoogle = () => async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    dispatch(setUser({ user, isAdmin: false }));
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(clearUser());
  } catch (error) {
    console.error(error);
  }
};
