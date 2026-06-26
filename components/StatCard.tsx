import { memo } from "react";

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
    <div className={`rounded-xl border ${containerClasses}`}>
      <div className="text-sm text-gray-500">
        {label}
      </div>

      <div className={`mt-2 ${sizeClasses}`}>
        {value}
      </div>
    </div>
  );
});

export default StatCard;
