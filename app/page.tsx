import { redirect } from "next/navigation";

/** Agents share direct /{slug} links; root redirects to the primary card. */
export default function HomePage() {
  redirect("/hans-kajiba-kuzanga");
}
