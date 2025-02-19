import { Wrapper } from "@/components/common/Wrapper/Wrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspaces/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Wrapper>Hello "/workspaces/"!</Wrapper>
    </div>
  );
}
