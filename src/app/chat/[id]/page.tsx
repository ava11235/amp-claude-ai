/**
 * Chat Page Component
 *
 * This file defines a Next.js page component for rendering a chat interface.
 * It serves as a wrapper for the Chat component, passing the chat ID from URL parameters.
 * 
 * Key features:
 * - Uses the 'use client' directive for client-side rendering
 * - Imports and renders the Chat component
 * - Extracts the chat ID from route parameters
 *
 * This component is designed to be used as a dynamic route in a Next.js application,
 * allowing for individual chat sessions to be accessed via unique URLs.
 */

import { Chat } from "./Chat";

export default function ChatPage({ params }: { params: { id: string } }) {
  return <Chat id={params.id} />;
}
