import * as z from "zod";

export let createAccountSchema = z.object({
  name: z.string().min(3).max(14),
  pin: z.string().min(4).max(16),
});
export let LoginAcauntT = z.object({
  name: z.string().min(3).max(14),
  pin: z.string().min(4).max(16),
});
