import { HomeIcon, SettingsIcon, StickyNoteIcon, LayoutTemplateIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Settings from "./pages/Settings.jsx";
import Notes from "./pages/Notes.jsx";
import TemplateAndServiceManagement from "./pages/TemplateAndServiceManagement.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Notes",
    to: "/notes",
    icon: <StickyNoteIcon className="h-4 w-4" />,
    page: <Notes />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    page: <Settings />,
  },
  {
    title: "Manage Templates & Services",
    to: "/manage",
    icon: <LayoutTemplateIcon className="h-4 w-4" />,
    page: <TemplateAndServiceManagement />,
  },
];