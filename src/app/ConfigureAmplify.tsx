/**
 * Amplify Configuration Component
 *
 * This file sets up the AWS Amplify configuration for the client-side application.
 * Key features:
 * - Uses the 'use client' directive for client-side execution
 * - Imports and configures Amplify with settings from 'amplify_outputs.json'
 * - Exports a null-rendering React component 'ConfigureAmplify'
 *
 * The purpose of this file is to ensure Amplify is properly configured
 * on the client side, allowing other components to use Amplify services.
 * The exported component can be used in the app's root to initialize Amplify.
 */
"use client";

import { Amplify } from "aws-amplify";
import config from "@/../amplify_outputs.json";

Amplify.configure(config);

export const ConfigureAmplify = () => {
  return null;
};
