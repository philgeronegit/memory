"use client";
import { useNote } from "@/application/queries/use-note";
import { Textarea } from "@/components/ui/textarea";
import useNotesStore from "@/store/useNotesStore";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import JsonUploader from "./json-uploader";

export function Note() {
  const { selectedNoteId } = useNotesStore();
  const [postContent, setPostContent] = useState("");
  const { data, isLoading, error } = useNote({ noteId: selectedNoteId });

  useEffect(() => {
    setPostContent(data?.content || "");
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No note selected</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {data.title}
        </h3>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  language={match[1]}
                  style={dark}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            }
          }}>
          {postContent}
        </Markdown>
        <Textarea
          value={postContent} // ...force the input's value to match the state variable...
          onChange={(e) => setPostContent(e.target.value)}
          className="h-96"
        />
        <JsonUploader />
      </div>
    </div>
  );
}
