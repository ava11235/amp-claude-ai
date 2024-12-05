/**
 * Conversations Context and Provider
 *
 * This file defines a React context and provider for managing chat conversations.
 * Key features:
 * - Creates a ConversationsContext with methods for CRUD operations on conversations
 * - Implements a ConversationsProvider component that:
 *   - Fetches and sorts initial conversations
 *   - Provides methods to update, create, and delete conversations
 *   - Manages conversation state using React hooks
 * - Utilizes a client API for backend communication
 * - Integrates with an Amplify schema for type definitions
 *
 * This context and provider enable centralized state management for chat conversations
 * across the application, facilitating real-time updates and consistent data handling.
 */

import React from "react";
import { Schema } from "@/../amplify/data/resource";
import { client } from "@/client";

interface ConversationsContextType {
  conversations: Schema["chat"]["type"][];
  setConversations: React.Dispatch<
    React.SetStateAction<Schema["chat"]["type"][]>
  >;
  updateConversation: (
    conversation: Partial<Schema["chat"]["type"]> & { id: string }
  ) => void;
  createConversation: () => Promise<Schema["chat"]["type"] | undefined>;
  deleteConversation: (input: { id: string }) => void;
}

export const ConversationsContext =
  React.createContext<ConversationsContextType>({
    conversations: [],
    setConversations: () => {},
    updateConversation: () => {},
    createConversation: async () => {
      return new Promise((resolve) => resolve(undefined));
    },
    deleteConversation: () => {},
  });

export const ConversationsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [conversations, setConversations] = React.useState<
    Schema["chat"]["type"][]
  >([]);

  React.useEffect(() => {
    client.conversations.chat.list().then((res) => {
      if (res.data) {
        setConversations(
          res.data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        );
      }
    });
  }, []);

  const updateConversation: ConversationsContextType["updateConversation"] = (
    conversation
  ) => {
    client.conversations.chat.update(conversation).then((res) => {
      if (res.data) {
        setConversations((prev) => {
          if (!res.data) return prev;
          const index = prev.findIndex((c) => c.id === conversation.id);
          if (index !== -1) {
            prev[index] = res.data;
            return [...prev];
          } else {
            return [res.data, ...prev];
          }
        });
      }
    });
  };

  const createConversation = async () => {
    const { data: conversation } = await client.conversations.chat.create();
    if (conversation) {
      setConversations((prev) => [conversation, ...prev]);
      return conversation;
    }
  };

  const deleteConversation: ConversationsContextType["deleteConversation"] = ({
    id,
  }) => {
    client.conversations.chat.delete({ id }).then(({ data, errors }) => {
      console.log({ data, errors });
      if (data) {
        setConversations((prev) => prev.filter((c) => c.id !== data.id));
      }
    });
  };

  const value = {
    conversations,
    setConversations,
    updateConversation,
    createConversation,
    deleteConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
