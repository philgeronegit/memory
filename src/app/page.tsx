"use client";

import { Comments } from "@/components/comments";
import { Note, Notes, Preview } from "@/components/notes";
import { Projects } from "@/components/projects/projects";
import { Tags } from "@/components/tags";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DndContext } from "@dnd-kit/core";
import { ChevronLeft, ListCollapse } from "lucide-react";
import { useRef, useState } from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle
} from "react-resizable-panels";

export default function Home() {
  const ref = useRef<ImperativePanelHandle>(null);
  const [collapsed, setCollapsed] = useState(false);

  const togglePanel = () => {
    const panel = ref.current;
    if (panel) {
      if (panel.isCollapsed()) {
        panel.expand();
        setCollapsed(false);
      } else {
        panel.collapse();
        setCollapsed(true);
      }
    }
  };

  return (
    <DndContext>
      <div className="h-full">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePanel}
            title="Toggle panel">
            {collapsed ? <ChevronLeft /> : <ListCollapse />}
          </Button>
        </div>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25} minSize={20}>
            <div className="h-full border border-slate-300 p-1">
              <Notes />
            </div>
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={45} minSize={30}>
            <div className="h-full border border-slate-300 p-1">
              <Note />
            </div>
          </Panel>
          <PanelResizeHandle />
          <Panel collapsible defaultSize={30} minSize={20} ref={ref}>
            <div className="h-full border border-slate-300 p-1 flex flex-col justify-between">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="comment">Commentaires</TabsTrigger>
                  <TabsTrigger value="project">Projets</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <Preview />
                </TabsContent>
                <TabsContent value="comment">
                  <Comments />
                </TabsContent>
                <TabsContent value="project">
                  <Projects />
                </TabsContent>
                <TabsContent value="tags">
                  <Tags />
                </TabsContent>
              </Tabs>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </DndContext>
  );
}
