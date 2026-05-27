import { revalidatePath } from "next/cache";

export function revalidateAgentCard(slug: string) {
  revalidatePath(`/${slug}`);
}
