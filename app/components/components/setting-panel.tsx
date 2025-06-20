"use client";
import React, { useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/app/components/ui/slider";
import { Settings as SettingsIcon } from "lucide-react";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

interface SettingsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SettingsPanel({ isOpen, onToggle }: SettingsPanelProps) {
  const {
    fontSize,
    setFontSize,
    paragraphSpacing,
    setParagraphSpacing,
    theme,
    setTheme,
  } = useContext(SettingsContext);

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<SVGSVGElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <>
      <SettingsIcon
        ref={buttonRef}
        onClick={onToggle}
        className="z-50 w-6 h-6 text-emerald-500 flex items-end cursor-pointer hover:text-emerald-400 transition-colors duration-200"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            className={cn(
              "absolute top-full left-0 right-0 w-full md:w-fit md:left-auto md:right-0 z-40 py-10 px-6 border-b shadow-lg",
              theme === "light"
                ? "bg-white border-gray-200 text-gray-900"
                : theme === "dark"
                ? "bg-slate-900 border-gray-700 text-gray-100"
                : "bg-[#f8f1e3] border-[#e8d9c0] text-[#5f4b32]"
            )}
          >
            <div className="items-center space-y-4 justify-center">
              <div className="flex items-center">
                <span className="whitespace-nowrap w-32 text-left">
                  Giao diện:
                </span>
                <div className="flex gap-2 ml-3">
                  {(["light", "dark", "sepia"] as Theme[]).map((t) => {
                    const bg =
                      t === "light"
                        ? "bg-white border border-gray-300"
                        : t === "dark"
                        ? "bg-gray-800"
                        : "bg-[#f8f1e3]";
                    const ring =
                      theme === t
                        ? "ring-2 ring-emerald-500"
                        : "ring-1 ring-gray-400/50";
                    return (
                      <button
                        key={t}
                        aria-label={
                          t === "light"
                            ? "Sáng"
                            : t === "dark"
                            ? "Tối"
                            : "Sepia"
                        }
                        onClick={() => setTheme && setTheme(t)}
                        className={cn(
                          "w-7 h-7 rounded-full transition-all cursor-pointer hover:scale-105 duration-200",
                          bg,
                          ring,
                          "focus:outline-none"
                        )}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-x-4 items-center">
                  <span className="whitespace-nowrap w-32 text-left">
                    Cỡ chữ:
                  </span>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(v) => setFontSize(v[0])}
                    min={20}
                    max={46}
                    step={2}
                    className="ml-3 w-40"
                  />
                </div>

                <div className="flex gap-x-4 items-center">
                  <span className="whitespace-nowrap w-32 text-left">
                    Khoảng cách dòng:
                  </span>
                  <Slider
                    value={[paragraphSpacing]}
                    onValueChange={(v) => setParagraphSpacing(v[0])}
                    min={4}
                    max={32}
                    step={2}
                    className="ml-3 w-40"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
