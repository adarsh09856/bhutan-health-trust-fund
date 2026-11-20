import { createFileRoute } from "@tanstack/react-router";
import { MembershipApplicationForm } from "@/components/membership-application-form";

export const Route = createFileRoute("/membership/individual")({
  head: () => ({
    meta: [
      { title: "Individual Membership | Bhutan Health Trust Fund" },
      {
        name: "description",
        content: "Apply for individual membership with the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: () => <MembershipApplicationForm type="INDIVIDUAL" />,
});
