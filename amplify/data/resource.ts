/**
 * This file defines an Amplify Backend schema for a chat application.
 * It includes:
 * - A 'chat' conversation model using Claude 3.5 Sonnet AI, with owner-based authorization.
 * - A 'chatNamer' generation model using Claude 3 Haiku AI for creating descriptive chat names.
 * - Schema type export for client-side use.
 * - Data configuration with user pool as the default authorization mode.
 *
 * The schema utilizes AWS Amplify's backend services for AI-powered conversations and name generation.
 */

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  chat: a.conversation({
    aiModel: a.ai.model("Claude 3.5 Sonnet"),
    systemPrompt: `You are a helpful assistant`,
  })
    .authorization((allow) => allow.owner()),

  chatNamer: a
    .generation({
      aiModel: a.ai.model("Claude 3 Haiku"),
      systemPrompt: `You are a helpful assistant that writes descriptive names for conversations. Names should be 2-10 words long`,
    })
    .arguments({
      content: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
      })
    )
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
