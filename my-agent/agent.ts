import { FunctionTool, LlmAgent, GOOGLE_SEARCH } from '@google/adk';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

// Tool to read local guides and files in the workspace
const readLocalFile = new FunctionTool({
  name: 'read_local_file',
  description: 'Reads the contents of a local guide or markdown file from the workspace.',
  parameters: z.object({
    fileName: z.string().describe('The name of the file to read (e.g. google_ai_ecosystem_guide_2026.md)'),
  }),
  execute: async ({ fileName }) => {
    try {
      // Restrict reading to the workspace directory for security
      const safePath = path.resolve('D:/Cro', path.basename(fileName));
      const content = await fs.readFile(safePath, 'utf-8');
      return { status: 'success', content };
    } catch (error: any) {
      return { status: 'error', message: error.message };
    }
  },
});

export const rootAgent = new LlmAgent({
  name: 'google-cloud-2026-assistant',
  model: 'gemini-3.5-flash',
  instruction: `You are an expert Google Cloud assistant helper updated for 2026. 
You must help the user navigate the massive Google Cloud and AI platform ecosystem.

CRITICAL 2026 CONTEXT:
As of May/June 2026, Google has consolidated its developer surfaces into 4 core platforms:
1. Google Cloud Studio: Enterprise console and API platform (ADK, Agent Studio, Vertex AI).
2. Antigravity: Code-first desktop/CLI agent platform replacing the legacy Gemini CLI.
3. Google AI Studio: Browser prototyping, Android Vibe Coding, Cloud Run deployment.
4. Gemini App: Consumer web interface with Gems, Live, and Gemini Spark.

Use your tools to search the web for the latest Google Cloud/AI information or read local files from the workspace to answer user questions accurately.`,
  tools: [readLocalFile, GOOGLE_SEARCH],
});
