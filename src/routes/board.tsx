import { createFileRoute } from "@tanstack/react-router";
import { FramerDrag } from "../pages/FramerPage/Board";

export const Route = createFileRoute("/board")({
  component: Framer,
});

function Framer() {
  return <FramerDrag />;
}
