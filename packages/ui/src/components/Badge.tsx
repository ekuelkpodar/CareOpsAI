import React from "react";

type Props = {
  tone?: "success" | "warning" | "danger" | "info";
  children: React.ReactNode;
};

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
  danger: "bg-rose-50 text-rose-700 border-rose-100",
  info: "bg-indigo-50 text-indigo-700 border-indigo-100",
};

export function Badge({ tone = "info", children }: Props) {
  const styles = toneMap[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${styles}`}>{children}</span>;
}
