import * as z from "zod";

export const severityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
export const statusEnum = z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]);

export const createBugSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  reproductionSteps: z
    .string()
    .min(5, "Reproduction steps must be at least 5 characters"),
  severity: severityEnum,
  environment: z.string().optional(),
  reference: z
    .string()
    .url("Reference must be a valid URL")
    .optional()
    .or(z.literal("")),
  codeSnippet: z.string().optional(),
  codingLanguage: z.string().optional(),
  solution: z.string().optional(),
  attachment: z.string().optional(),
});

export const updateBugSchema = createBugSchema.partial().extend({
  status: statusEnum.optional(),
});
