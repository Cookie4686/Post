import { getNovels } from "@/app/lib/database";
import CardWrapper from "@/app/ui/components/NovelCard/CardWrapper";

export default async function NovelList() {
  const { novels } = await getNovels();
  return <CardWrapper novels={novels}></CardWrapper>;
}
