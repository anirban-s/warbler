import { apiCall } from "../../services/api";
import { addError } from "./error";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = (messages) => ({
  type: LOAD_MESSAGES,
  messages,
});

export const remove = (id) => ({
  type: REMOVE_MESSAGE,
  id,
});

export const removeMessage = (user_id, message_id) => {
  return (dispatch) => {
    return apiCall("DELETE", `/api/users/${user_id}/messages/${message_id}`)
      .then(function () {
        dispatch(remove(message_id));
      })
      .catch(function (err) {
        dispatch(addError(err.message));
      });
  };
};

export const fetchMessages = () => {
  return (dispatch) => {
    return apiCall("GET", "/api/messages")
      .then(function (res) {
        dispatch(loadMessages(res));
      })
      .catch(function (err) {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMesasge = (text) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("POST", `/api/users/${id}/messages`, { text })
    .then((res) => {})
    .catch((err) => {
      dispatch(addError(err.message));
    });
};
