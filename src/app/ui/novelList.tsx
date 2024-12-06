import CardWrapper from "@/app/ui/components/NovelCard/CardWrapper";
import { getNovels } from "@/app/lib/database";

export default async function NovelList() {
  const { novels } = await getNovels();
  return <CardWrapper novels={novels}></CardWrapper>;
}
