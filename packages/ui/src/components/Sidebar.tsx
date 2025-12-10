import React from "react";

type Item = { label: string; href: string; icon?: string };

type Props = {
  items: Item[];
  footer?: React.ReactNode;
};

export function Sidebar({ items, footer }: Props) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-slate-50/60">
      <div className="px-4 py-4 text-base font-semibold text-slate-800">CareOps AI</div>
      <nav className="flex-1 space-y-1 px-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
          >
            {item.icon ? <span className="text-xs text-slate-400">{item.icon}</span> : null}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      {footer ? <div className="border-t border-slate-200 px-3 py-3 text-xs text-slate-500">{footer}</div> : null}
    </aside>
  );
}
