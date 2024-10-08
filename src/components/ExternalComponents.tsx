"use client";
import { FloatingDock } from "@/components/aceternity/FloatingDock";
import {
  CalendarRange,
  ChartNoAxesCombined,
  Link2,
  Music2,
  Newspaper,
  NotebookPen,
} from "lucide-react";
import { SiGooglegemini } from "react-icons/si";
import { componentStore } from "@/lib/store";

const ExternalComponents = () => {
  const { setVisibleComponent } = componentStore();

  const links = [
    {
      title: "Shortcuts",
      icon: <Link2 size={20} />,
      component: () => setVisibleComponent("URLShortcuts"),
    },
    {
      title: "Calendar",
      icon: <CalendarRange size={20} />,
      component: () => setVisibleComponent("ComingSoon"),
    },
    {
      title: "Stocks",
      icon: <ChartNoAxesCombined size={20} />,
      component: () => setVisibleComponent("ComingSoon"),
    },
    {
      title: "Coming Soon 3",
      icon: <Newspaper size={20} />,
      component: () => setVisibleComponent("ComingSoon"),
    },
    {
      title: "Coming Soon 4",
      icon: <SiGooglegemini size={20} />,
      component: () => setVisibleComponent("ComingSoon"),
    },
    {
      title: "Coming Soon 5",
      icon: <NotebookPen size={20} />,
      component: () => setVisibleComponent("ComingSoon"),
    },

    {
      title: "Coming Soon 6",
      icon: <Music2 size={20} />,
      component: () => setVisibleComponent("ComingSoon"),
    },
  ];
  return <FloatingDock items={links} />;
};

export default ExternalComponents;
