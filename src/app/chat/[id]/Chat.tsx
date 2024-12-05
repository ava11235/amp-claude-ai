/**
 * Chat Component
 * 
 * This file defines a React component for a chat interface using AWS Amplify's AI services.
 * It includes:
 * - Integration with AWS Amplify's AI conversation hooks and UI components
 * - Dynamic conversation naming using a separate AI model
 * - Custom message rendering with Markdown support
 * - Context-based conversation management
 * 
 * The component handles message sending, loading states, and updates conversation metadata.
 * It's designed to be used in a client-side React application with AWS Amplify backend.
 */

"use client";
import * as React from "react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import { View } from "@aws-amplify/ui-react";
import { client, useAIConversation } from "@/client";
import { ConversationsContext } from "@/providers/ConversationsProvider";
import ReactMarkdown from "react-markdown";

export const Chat = ({ id }: { id: string }) => {
  const { updateConversation } = React.useContext(ConversationsContext);
  const [
    {
      data: { messages, conversation },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation("chat", { id });

  return (
    <View padding="large" flex="1">
      <AIConversation
        allowAttachments
        messages={messages}
        handleSendMessage={(message) => {
          sendMessage(message);
          // only run this on the first message...
          if (!conversation?.name) {
            client.generations
              .chatNamer({
                content: message.content.map((c) => c.text ?? "").join(""),
              })
              .then((res) => {
                updateConversation({
                  id,
                  name: res.data?.name ?? "",
                });
              });
          }
        }}
        isLoading={isLoading}
        messageRenderer={{
          text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>,
        }}
      />
    </View>
  );
};
