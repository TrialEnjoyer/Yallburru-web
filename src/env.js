import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    CONTACT_EMAIL: z.string(),
    CONTACT_SMTP_HOST: z.string(),
    CONTACT_SMTP_PORT: z.string(),
    CONTACT_SMTP_USER: z.string(),
    CONTACT_SMTP_PASS: z.string(),
    UPLOADTHING_TOKEN: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_SUPABASE_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    CONTACT_SMTP_HOST: process.env.CONTACT_SMTP_HOST,
    CONTACT_SMTP_PORT: process.env.CONTACT_SMTP_PORT,
    CONTACT_SMTP_USER: process.env.CONTACT_SMTP_USER,
    CONTACT_SMTP_PASS: process.env.CONTACT_SMTP_PASS,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_SECRET,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
