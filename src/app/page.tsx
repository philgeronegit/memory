"use client";

import { Comments } from "@/components/comments";
import { Note, Notes } from "@/components/notes";
import { Projects } from "@/components/projects/projects";
import { Tags } from "@/components/tags";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Home() {
  return (
    <div className="h-screen">
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
          <div className="h-full border border-slate-300 p-1 flex flex-col gap-4">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="comment">Commentaires</TabsTrigger>
                <TabsTrigger value="project">Projets</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">TODO preview de la note</TabsContent>
              <TabsContent value="comment">
                <Comments />
              </TabsContent>
              <TabsContent value="project">
                <Projects />
              </TabsContent>
            </Tabs>
            <Tags />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
