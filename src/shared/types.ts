import { z } from 'zod';

export type modelType = {
  regexActiveOnUrl: string;
  url?: string;
  querySelectorAllTextContent: string;
  name?: string;
  replacers: {
    regexSearchToApply?: string;
    regexGlobalFound: string;
    name: string;
    replaceBy: string;
  }[];
}[];

const replacerSchema = z.object({
  regexSearchToApply: z.string().optional(),
  regexGlobalFound: z.string(),
  name: z.string().optional(),
  replaceBy: z.string()
});

const modelSchema = z.object({
  regexActiveOnUrl: z.string(),
  url: z.string().optional(),
  querySelectorAllTextContent: z.string(),
  name: z.string().optional(),
  replacers: z.array(replacerSchema)
});

export const modelConfigSchema = z.array(modelSchema);
