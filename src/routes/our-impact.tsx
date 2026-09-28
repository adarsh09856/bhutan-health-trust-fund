import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/our-impact")({
  beforeLoad: () => {
    throw redirect({ to: "/our-work" });
  },
});
