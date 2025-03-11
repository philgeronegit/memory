"use client";

import AppBar from "@/components/app-bar/appBar";
import { Comments } from "@/components/comments";
import { Note, Notes } from "@/components/notes";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Home() {
  return (
    <div className="h-screen bg-slate-100">
      <AppBar />
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <div className="h-full border border-slate-300 p-1">
            <Notes />
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel minSize={30}>
          <div className="h-full border border-slate-300 p-1">
            <Note />
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel collapsible={true} defaultSize={30} minSize={20}>
          <div className="h-full border border-slate-300 p-1">
            <Comments />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
