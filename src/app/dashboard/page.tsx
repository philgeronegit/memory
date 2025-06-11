"use client";

import { useNotes } from "@/application/queries/use-notes";
import { useProjects } from "@/application/queries/use-projects";
import { useTasks } from "@/application/queries/use-tasks";
import { NoteMarkdown } from "@/components/notes/note-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis
} from "recharts";

interface CardsViewProps<T> {
  data: T[];
  isLoading: boolean;
  isError: boolean;
  title: string;
  emptyText: string;
  children: React.ReactNode;
}

const CardsView = <T,>({
  data,
  isLoading,
  isError,
  title,
  emptyText,
  children
}: CardsViewProps<T>) => (
  <div>
    <h2>{title}</h2>
    {isLoading && <p>Chargement...</p>}
    {isError && <p>Une erreur est survenue</p>}
    {data && data.length === 0 && <p>{emptyText}</p>}
    <div className="flex gap-2 flex-col md:flex-row">{children}</div>
  </div>
);

const chartData = [
  { month: "Novembre", desktop: 7, mobile: 8 },
  { month: "Décembre", desktop: 8, mobile: 8 },
  { month: "Janvier", desktop: 6, mobile: 8 },
  { month: "Février", desktop: 5, mobile: 2 },
  { month: "Mars", desktop: 7, mobile: 12 }
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))"
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))"
  },
  label: {
    color: "hsl(var(--background))"
  }
} satisfies ChartConfig;

export default function Dashboard() {
  const notes = useNotes();
  const projects = useProjects();
  const projectsData = projects?.data ?? [];
  const tasks = useTasks();
  const tasksData = tasks?.data ?? [];
  const mostRecentNotes = notes.data?.slice(0, 3) ?? [];

  return (
    <div className="p-4">
      <CardsView
        data={mostRecentNotes}
        isLoading={notes.isLoading}
        isError={notes.isError}
        title="Notes les plus récentes"
        emptyText="Aucune note">
        {mostRecentNotes &&
          mostRecentNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardContent>
                  <NoteMarkdown noteContent={note.content} />
                </CardContent>
              </CardHeader>
            </Card>
          ))}
      </CardsView>

      <CardsView
        data={tasksData}
        isLoading={notes.isLoading}
        isError={notes.isError}
        title="Mes tâches"
        emptyText="Aucune tâche">
        {tasksData &&
          tasksData.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
      </CardsView>

      <CardsView
        data={projectsData}
        isLoading={notes.isLoading}
        isError={notes.isError}
        title="Mes projets"
        emptyText="Aucun projet">
        {projectsData &&
          projectsData.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle>{task.name}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
      </CardsView>

      <h2>Notes des derniers mois</h2>
      <ChartContainer config={chartConfig} className="h-[200px]">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{ right: 16 }}>
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="desktop" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey="desktop"
            layout="vertical"
            fill="var(--color-desktop)"
            radius={4}>
            <LabelList
              dataKey="month"
              position="insideLeft"
              offset={8}
              className="fill-[--color-label]"
              fontSize={12}
            />
            <LabelList
              dataKey="desktop"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
