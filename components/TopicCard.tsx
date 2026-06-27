import { memo } from "react";
import { STYLES } from "@/app/lib/styles";

type TopicCardProps = {
  title: string;
  description: string;
};

const TopicCard = memo(function TopicCard({
  title,
  description,
}: TopicCardProps) {
  return (
    <div className={`${STYLES.card} ${STYLES.cardHover} border-l-4 border-l-teal-500 pl-5`}>
      <h3 className={STYLES.h3}>{title}</h3>

      <p className="mt-2 text-sm text-slate-650 leading-relaxed">
        {description}
      </p>
    </div>
  );
});

export default TopicCard;