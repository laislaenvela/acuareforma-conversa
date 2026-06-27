import { memo } from "react";
import { STYLES } from "@/app/lib/styles";

type StatCardProps = {
  label: string;
  value: number | string;
  variant?: "default" | "lg";
};

const StatCard = memo(function StatCard({
  label,
  value,
  variant = "default",
}: StatCardProps) {
  const sizeClasses =
    variant === "lg"
      ? "text-4xl font-bold"
      : "text-3xl font-bold";

  const containerClasses =
    variant === "lg"
      ? "p-6"
      : "p-4";

  return (
    <div className={`${STYLES.card} ${containerClasses}`}>
      <div className={STYLES.cardLabel}>
        {label}
      </div>

      <div className={`mt-4 ${sizeClasses}`}>
        {value}
      </div>
    </div>
  );
});

export default StatCard;
