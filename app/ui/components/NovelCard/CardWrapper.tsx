import { CardData } from "@/app/lib/database";
import Card from "./Card";
import "./card.css";

export default function CardWrapper(props: { novels: CardData[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,var(--card-w))] gap-4 h-full w-full">
      {props.novels.map((novel) => (
        <Card key={novel.id} novel={novel}></Card>
      ))}
    </div>
  );
}
