import { useRef, useState } from "react";

const OLLAMA_API_URL = "http://localhost:11434/api/chat";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

type OllamaRequest = {
  model: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  stream: boolean;
};

type UseOllamaResponse = {
  response: string;
  loading: boolean;
  callOllama: (payload: OllamaRequest) => Promise<void>;
  cancelRequest: () => void;
  setResponse: (response: string) => void;
};

export function useOllama(): UseOllamaResponse {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const callOllama = async (payload: OllamaRequest) => {
    setResponse("");
    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch(OLLAMA_API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal
      });

      if (!res.body) {
        throw new Error("No response body");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.done) {
              setLoading(false);
              return;
            }
            if (json.message?.content) {
              result += json.message.content;
              setResponse(result);
            }
          } catch (e) {
            console.error("Error parsing JSON chunk:", e);
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        console.error("Request aborted");
      } else {
        setResponse("Error: " + (err as Error).message);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return { response, loading, callOllama, cancelRequest, setResponse };
}

type UseSpellCheckResponse = {
  response: string;
  loading: boolean;
  handleSpellCheck: (inputValue: string) => Promise<void>;
  cancelSpellCheck: () => void;
  setResponse: (response: string) => void;
  undo: () => void;
};

export function useSpellCheck(): UseSpellCheckResponse {
  const { response, loading, callOllama, cancelRequest, setResponse } =
    useOllama();

  const handleSpellCheck = async (inputValue: string) => {
    const payload: OllamaRequest = {
      model: "qwen2.5:1.5b",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that follows instruction extremely well. Help as much as you can."
        },
        {
          role: "user",
          content: `Always respond in the input language. If the input is in markdow respond in markdown. Don't give any explanation, just give the raw result. Proofread the below for spelling and grammar: ${inputValue}`
        }
      ]
    };

    await callOllama(payload);
  };

  const undo = () => {
    cancelRequest();
    setResponse("");
  };

  return {
    cancelSpellCheck: cancelRequest,
    handleSpellCheck,
    loading,
    response,
    setResponse,
    undo
  };
}

type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenAIRequest = {
  model: string;
  messages: OpenAIMessage[];
  stream: boolean;
};

type UseOpenAIResponse = {
  response: string;
  loading: boolean;
  callOpenAI: (payload: OpenAIRequest, apiKey: string) => Promise<void>;
  cancelRequest: () => void;
  setResponse: (response: string) => void;
};

export function useOpenAI(): UseOpenAIResponse {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const callOpenAI = async (payload: OpenAIRequest, apiKey: string) => {
    setResponse("");
    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch(OPENAI_API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        signal: controller.signal
      });

      if (!res.ok) {
        throw new Error(`OpenAI API error: ${res.status} ${res.statusText}`);
      }

      if (!res.body) {
        throw new Error("No response body");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim().startsWith("data:"));

        for (const line of lines) {
          const data = line.replace(/^data: /, "").trim();
          if (data === "[DONE]") {
            setLoading(false);
            return;
          }

          try {
            const json = JSON.parse(data);
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              result += content;
              setResponse(result);
            }
          } catch (e) {
            console.error("Error parsing JSON chunk:", e);
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        console.error("Request aborted");
      } else {
        setResponse("Error: " + (err as Error).message);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return { response, loading, callOpenAI, cancelRequest, setResponse };
}

type UseSpellCheckOpenAIResponse = {
  response: string;
  loading: boolean;
  handleSpellCheck: (inputValue: string) => Promise<void>;
  cancelSpellCheck: () => void;
  setResponse: (response: string) => void;
  undo: () => void;
};

export function useSpellCheckOpenAI(): UseSpellCheckOpenAIResponse {
  const { response, loading, callOpenAI, cancelRequest, setResponse } = useOpenAI();

  const handleSpellCheck = async (inputValue: string) => {
    const apiKey = localStorage.getItem("aiApiKey");
    if (!apiKey) {
      setResponse("Error: OpenAI API key not found. Please configure it in Options.");
      return;
    }

    const payload: OpenAIRequest = {
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that follows instruction extremely well. Help as much as you can."
        },
        {
          role: "user",
          content: `Always respond in the input language. If the input is in markdown respond in markdown. Don't give any explanation, just give the raw result. Proofread the below for spelling and grammar: ${inputValue}`
        }
      ]
    };

    await callOpenAI(payload, apiKey);
  };

  const undo = () => {
    cancelRequest();
    setResponse("");
  };

  return {
    cancelSpellCheck: cancelRequest,
    handleSpellCheck,
    loading,
    response,
    setResponse,
    undo
  };
}
