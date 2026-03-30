import { redirect } from "next/navigation";
import { zones } from "@/config/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return zones.map((zone) => ({ slug: zone.slug }));
}

export default function ZonePage({ params }: Props) {
  const zone = zones.find((z) => z.slug === params.slug);
  if (!zone) redirect("/zones");
  redirect(`/rideau-metallique-${zone.slug}`);
}
