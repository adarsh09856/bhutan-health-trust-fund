import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/other-publications")({
  beforeLoad: () => {
    throw redirect({ to: "/resources/other-publications" });
  },
});
