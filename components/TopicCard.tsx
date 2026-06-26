import { memo } from "react";

type TopicCardProps = {
  title: string;
  description: string;
};

const TopicCard = memo(function TopicCard({
  title,
  description,
}: TopicCardProps) {
  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-gray-600">
        {description}
      </p>
    </div>
  );
});

export default TopicCard;