import app from "../../../config/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push, onValue, set, remove } from "firebase/database";


export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "Azami" });
  }, 2000);
};

export const registerUserApi = ({ email, password }) => (dispatch) => {
  return new Promise((resolve, rejecct) => {
    const auth = getAuth(app);
    dispatch({ type: "CHANGE_LOADING", value: true });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          console.log('Success: ', user);
          dispatch({ type: "CHANGE_LOADING", value: false });
          resolve(true);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Code: ${errorCode}`, `msg: ${errorMessage}`);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        rejecct(false);
      });
  });
}

export const loginUserApi = ({ email, password }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth(app);
    dispatch({ type: "CHANGE_LOADING", value: true });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          const dataUser = {
            email: user.email,
            uid: user.uid,
            emailVerified: user.emailVerified,
            refreshToken: user.refreshToken,
          }
          console.log(dataUser);

          dispatch({ type: "CHANGE_LOADING", value: false });
          dispatch({ type: "CHANGE_ISLOGIN", value: true });
          dispatch({ type: "CHANGE_USER", value: dataUser });
          resolve(dataUser);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        dispatch({ type: 'CHANGE_ISLOGIN', value: false });
        reject(false);
      });
  });
}

export const addDataToAPI = (data) => (dispatch) => {
  const db = getDatabase();
  const note = ref(db, 'notes/' + data.userId)
  push(note, {
    title: data.title,
    content: data.content,
    date: data.date
  });
}

export const getDataFromAPI = (userId) => (dispatch) => {
  const db = getDatabase();
  const note = ref(db, 'notes/' + userId);

  return new Promise((resolve, reject) => {
    onValue(note, (snapshot) => {
      console.log('getData: ', snapshot.val());
      const data = [];
      Object.keys(snapshot.val()).map(key => {
        data.push({
          id: key,
          data: snapshot.val()[key]
        })
      })
      dispatch({ type: 'SET_NOTES', value: data })
      resolve(snapshot.val());
    });
  })
}

export const updateDataFromAPI = (data) => (dispatch) => {
  const db = getDatabase();
  const note = ref(db, `notes/${data.userId}/${data.noteId}`)
  return new Promise((resolve, reject) => {
    set(note, {
      title: data.title,
      content: data.content,
      date: data.date
    })
      .then(() => resolve(true))
      .catch((err) => reject(false))
  })
}

export const deleteDataFromAPI = (data) => (dispatch) => {
  const db = getDatabase();
  const note = ref(db, `notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    remove(note);
  });
}