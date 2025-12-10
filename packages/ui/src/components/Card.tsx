import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Card({ title, children, footer }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">{title}</div>
      <div className="px-4 py-3 text-sm text-slate-700">{children}</div>
      {footer ? <div className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">{footer}</div> : null}
    </div>
  );
}
