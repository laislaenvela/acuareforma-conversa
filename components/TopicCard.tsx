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
    <div className={STYLES.card}>
      <h3 className={STYLES.cardTitle}>{title}</h3>

      <p className={STYLES.cardBody}>
        {description}
      </p>
    </div>
  );
});

export default TopicCard;