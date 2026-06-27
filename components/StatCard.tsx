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
  const isLg = variant === "lg";
  
  return (
    <div className={`${STYLES.card} ${STYLES.cardHover} relative overflow-hidden group`}>
      {/* Decorative water drop background circle */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br from-teal-500/5 to-sky-500/5 group-hover:from-teal-500/10 group-hover:to-sky-500/10 transition-colors duration-300" />
      
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </div>

      <div className={`mt-3 font-extrabold tracking-tight text-slate-800 ${isLg ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
        {value}
      </div>
    </div>
  );
});

export default StatCard;
