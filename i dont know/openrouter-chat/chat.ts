import { OpenRouter } from '@openrouter/sdk';
import readline from 'node:readline';

/**
 * Verified Model Examples:
 * - google/gemini-2.0-flash-lite-preview-02-05:free
 * - openai/gpt-4o-mini
 * - anthropic/claude-3.5-haiku
 * - meta-llama/llama-3.3-70b-instruct
 */
const SELECTED_MODEL = 'google/gemini-2.0-flash-lite-preview-02-05:free';

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY is missing.');
  console.log('Please create a key at: https://openrouter.ai/settings/keys');
  console.log('Then add it to your environment:');
  console.log('  Windows (PowerShell): $env:OPENROUTER_API_KEY="sk-or-v1-..."');
  console.log('  Windows (Command Prompt): set OPENROUTER_API_KEY=sk-or-v1-...');
  console.log('  Linux/macOS: export OPENROUTER_API_KEY=sk-or-v1-...');
  process.exit(1);
}

const client = new OpenRouter({ apiKey });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: { role: 'user' | 'assistant'; content: string }[] = [];

async function chat() {
  console.log(`Chatting with ${SELECTED_MODEL}. Type 'exit' to quit.\n`);

  while (true) {
    const userInput = await new Promise<string>((resolve) => {
      rl.question('You: ', resolve);
    });

    if (userInput.toLowerCase() === 'exit') {
      rl.close();
      break;
    }

    if (!userInput.trim()) continue;

    messages.push({ role: 'user', content: userInput });

    try {
      const stream = await client.chat.send({
        chatRequest: {
          model: SELECTED_MODEL,
          messages: messages,
          stream: true,
        },
      });

      process.stdout.write('Assistant: ');
      let fullResponse = '';

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          process.stdout.write(content);
          fullResponse += content;
        }
      }
      process.stdout.write('\n\n');

      messages.push({ role: 'assistant', content: fullResponse });
    } catch (error) {
      console.error('\nError during chat:', error);
    }
  }
}

chat();
