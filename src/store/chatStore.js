import { create } from "zustand";

const useChatStore = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  updateMessage: (chat) =>
  set((state) => {
    const index = state.messages.findIndex((c) => c._id === chat._id);

    if (index !== -1) {
      const newList = [...state.messages];
      newList[index] = chat;
      return { messages: [chat, ...newList.filter((_, i) => i !== index)] };
    }

    return { messages: [chat, ...state.messages] };
  })
}));

export default useChatStore;
