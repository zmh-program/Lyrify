// code from sipc

import axios from "axios";
import { getErrorMessage } from "@/pages/api/lib/utils";

export class ChatGPT {
  public key: string;
  public apiUrl: string;
  public model: string;

  constructor(
    key: string,
    apiUrl = "https://api.openai.com/v1/chat/completions",
    model = "gpt-3.5-turbo",
  ) {
    this.key = key;
    this.apiUrl = apiUrl;
    this.model = model;
  }

  async translate(text: string, target: string, source: string = "auto") {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.key}`,
      };
      const data = JSON.stringify({
        model: this.model,
        messages: [
          {
            role: "user",
            content: `将"${text}"从${source}翻译为${target}(!!!直接返回翻译内容不要打引号)`,
          },
        ],
        temperature: 0.7,
      });
      const response = await axios.post(this.apiUrl, data, { headers });
      return response.data.choices[0].message.content;
    } catch (error) {
      throw new Error(`Error while translating: ${getErrorMessage(error)}`);
    }
  }
}

export const ChatGPTInstance = new ChatGPT(
  process.env.OpenAI_API_KEY as string,
  process.env.OpenAI_API_ENDPOINT,
  process.env.OpenAI_MODEL,
);
