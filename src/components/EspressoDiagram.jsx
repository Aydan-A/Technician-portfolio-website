import React, { useRef, useCallback } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

export default function EspressoDiagram() {
  const imgRef = useRef();

  // This handles the smooth visual zooming/moving math
  const onUpdate = useCallback(({ x, y, scale }) => {
    if (imgRef.current) {
      const value = make3dTransformValue({ x, y, scale });
      imgRef.current.style.transform = value;
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
      <h3 className="text-xl font-semibold text-zinc-100 mb-2 text-center">
        Interactive Espresso System Architecture
      </h3>
      <p className="text-sm text-zinc-400 text-center mb-4">
        Scroll/Pinch to zoom. Click and drag to pan around the sections.
      </p>

      {/* The Zoom Container */}
      <div className="relative overflow-hidden border border-zinc-700 rounded-lg bg-black cursor-grab active:cursor-grabbing select-none h-[400px]">
        <QuickPinchZoom onUpdate={onUpdate} wheelScaleFactor={0.05}>
          {/* This is the element being zoomed. 
            For now, we are creating a 4-section grid using HTML/CSS to simulate your diagram layers.
          */}
          <div 
            ref={imgRef} 
            className="w-full h-[400px] grid grid-cols-4 divide-x divide-zinc-700 bg-zinc-950 origin-top-left"
          >
            {/* Section 1 */}
            <div className="p-4 flex flex-col justify-between text-center">
              <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">1. Water Supply</span>
              <div className="space-y-4 my-auto">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-300 font-mono">Water Tank</div>
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-300 font-mono">Plumbing Kit</div>
              </div>
              <span className="text-[10px] text-zinc-500">→ Supplies pumps</span>
            </div>

            {/* Section 2 */}
            <div className="p-4 flex flex-col justify-between text-center bg-zinc-900/30">
              <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">2. Pumps</span>
              <div className="space-y-4 my-auto">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-300 font-mono">Vibratory Pump</div>
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-300 font-mono">Rotary Pump</div>
              </div>
              <span className="text-[10px] text-zinc-500">→ Builds pressure</span>
            </div>

            {/* Section 3 */}
            <div className="p-4 flex flex-col justify-between text-center">
              <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">3. Heating</span>
              <div className="space-y-2 my-auto text-left text-xs text-zinc-400 font-mono">
                <div className="p-1 bg-zinc-900 border border-zinc-800 rounded text-center">Single Boiler</div>
                <div className="p-1 bg-zinc-900 border border-zinc-800 rounded text-center">Heat Exchanger (HX)</div>
                <div className="p-1 bg-zinc-900 border border-zinc-800 rounded text-center">Dual Boiler</div>
                <div className="p-1 bg-zinc-900 border border-zinc-800 rounded text-center">Thermoblock</div>
              </div>
              <span className="text-[10px] text-zinc-500">→ Thermal stability</span>
            </div>

            {/* Section 4 */}
            <div className="p-4 flex flex-col justify-between text-center bg-zinc-900/30">
              <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">4. Dispensing</span>
              <div className="space-y-4 my-auto">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-300 font-mono">E61 Grouphead</div>
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-300 font-mono">Saturated Group</div>
              </div>
              <span className="text-[10px] text-zinc-500">→ Extraction zone</span>
            </div>

          </div>
        </QuickPinchZoom>
      </div>
    </div>
  );
}