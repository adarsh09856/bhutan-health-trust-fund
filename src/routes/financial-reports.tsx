import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/financial-reports")({
  beforeLoad: () => {
    throw redirect({ to: "/resources/financial-reports" });
  },
});
