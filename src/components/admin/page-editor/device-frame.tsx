import React from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

export type DeviceMode = "desktop" | "tablet" | "mobile";

export function DeviceToolbar({
  mode,
  onChange,
}: {
  mode: DeviceMode;
  onChange: (m: DeviceMode) => void;
}) {
  return (
    <div className="flex items-center bg-slate-800/90 backdrop-blur-md p-1 rounded-lg border border-slate-700 shadow-xs">
      <button
        type="button"
        onClick={() => onChange("desktop")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
          mode === "desktop"
            ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
            : "text-slate-400 hover:text-white"
        }`}
        title="Desktop View (100%)"
      >
        <Monitor className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Desktop</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("tablet")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
          mode === "tablet"
            ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
            : "text-slate-400 hover:text-white"
        }`}
        title="Tablet View (768px)"
      >
        <Tablet className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Tablet</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("mobile")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
          mode === "mobile"
            ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
            : "text-slate-400 hover:text-white"
        }`}
        title="Mobile View (375px)"
      >
        <Smartphone className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Mobile</span>
      </button>
    </div>
  );
}

export function DeviceFrame({
  mode,
  children,
}: {
  mode: DeviceMode;
  children: React.ReactNode;
}) {
  if (mode === "desktop") {
    return <div className="w-full h-full min-h-[800px] bg-white shadow-xl">{children}</div>;
  }

  const widthClass = mode === "tablet" ? "max-w-[768px]" : "max-w-[390px]";

  return (
    <div className="flex justify-center p-4 sm:p-8 bg-slate-900/60 min-h-full overflow-y-auto">
      <div
        className={`w-full ${widthClass} transition-all duration-300 bg-white rounded-2xl shadow-2xl border-4 border-slate-700 overflow-hidden flex flex-col`}
      >
        {/* Mock Device Header Notch */}
        <div className="bg-slate-800 py-1.5 px-4 flex items-center justify-between text-[10px] text-slate-400 select-none">
          <span className="font-mono">BHTF Mobile Portal</span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>5G Bhutan</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
