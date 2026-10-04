import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/annual-reports")({
  beforeLoad: () => {
    throw redirect({ to: "/resources/annual-reports" });
  },
});
