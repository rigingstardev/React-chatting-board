import { createSlice } from "@reduxjs/toolkit";

const initialChatState = {

};
export const callTypes = {
  list: "list",
  action: "action"
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatState,
  reducers: {
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
  }
});
