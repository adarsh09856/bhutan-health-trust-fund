import { createFileRoute } from "@tanstack/react-router";
import { MembershipApplicationForm } from "@/components/membership-application-form";

export const Route = createFileRoute("/membership/institutional")({
  head: () => ({
    meta: [
      { title: "Institutional Membership | Bhutan Health Trust Fund" },
      {
        name: "description",
        content: "Apply for institutional membership with the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: () => <MembershipApplicationForm type="INSTITUTIONAL" />,
});
