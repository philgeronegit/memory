"use client";

import { Comments } from "@/components/comments";
import { Note, Notes, Preview } from "@/components/notes";
import { Projects } from "@/components/projects";
import { Tags } from "@/components/tags";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
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
import { useMedia } from "react-use";

export default function Home() {
  const ref = useRef<ImperativePanelHandle>(null);
  const [collapsed, setCollapsed] = useState(false);
  const isWide = useMedia("(min-width: 480px)");
  const [open, setOpen] = useState(false);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );

  const togglePanel = () => {
    if (!isWide) {
      setOpen(!open);
      return;
    }
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

  const mobileLayout = (
    <div>
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="h-full border border-slate-300 p-1">
            <Notes />
          </div>
        </DrawerContent>
      </Drawer>
      <div className="h-full p-1">
        <Note />
      </div>
    </div>
  );

  const desktopLayout = (
    <PanelGroup direction="horizontal" autoSaveId="main-panel-group">
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

      <Panel
        collapsible
        defaultSize={30}
        minSize={20}
        ref={ref}
        onResize={(size) => {
          console.log("Panel resized:", size);
          if (size < 30) {
            setOrientation("vertical");
          } else {
            setOrientation("horizontal");
          }
        }}>
        <div className="h-full border border-slate-300 p-1 flex flex-col justify-between">
          <Tabs
            orientation={orientation}
            defaultValue="comment"
            className="w-full">
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
  );

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
        {isWide ? desktopLayout : mobileLayout}
      </div>
    </DndContext>
  );
}
