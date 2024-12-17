import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { sendEmail } from "~/utils/mailer";

export const mailRouter = createTRPCRouter({
    send: publicProcedure.input(z.object({ email: z.string().email(), message: z.string(), subject: z.string(), name: z.string(), fullName: z.string(), phone: z.string(), preferred_contact: z.string() })).mutation(async ({ input }) => {
        const { email, message, subject, name, fullName, phone, preferred_contact } = input;
      const mail = {
        to: email,
        subject: subject,
        text: message,
        name: name,
        fullName: fullName,
        phone: phone,
        preferred_contact: preferred_contact,
      };
      await sendEmail(mail);
      return {
        message: `Confirmation Email sent to ${input.email}`,
      };
    }),
  });
  
  