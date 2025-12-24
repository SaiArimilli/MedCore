import React, { useEffect, useState } from 'react';

const COLORS: Record<string, string> = {
  Blue: '#2563eb',
  Green: '#059669',
  Rose: '#e11d48'
};

const FONTS: Record<string, string> = {
  Inter: "'Inter', sans-serif",
  Poppins: "'Poppins', sans-serif",
  Roboto: "'Roboto', sans-serif"
};

const ThemeSwitcher: React.FC = () => {
  const [color, setColor] = useState<string>(localStorage.getItem('mc_primary') || COLORS.Blue);
  const [font, setFont] = useState<string>(localStorage.getItem('mc_font') || FONTS.Inter);
  const [scale, setScale] = useState<number>(parseFloat(localStorage.getItem('mc_scale') || '1'));

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--font-family', font);
    document.documentElement.style.setProperty('--font-scale', String(scale));
    localStorage.setItem('mc_primary', color);
    localStorage.setItem('mc_font', font);
    localStorage.setItem('mc_scale', String(scale));
  }, [color, font, scale]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg border border-slate-100">
      <div className="text-xs text-slate-500 font-bold mb-2">Theme</div>
      <div className="flex gap-2 mb-2">
        {Object.entries(COLORS).map(([name, val]) => (
          <button key={name} onClick={() => setColor(val)} title={name} className="w-6 h-6 rounded-full" style={{ background: val, border: color === val ? '2px solid black' : 'none' }} />
        ))}
      </div>
      <div className="flex gap-2 items-center mb-2">
        <select value={font} onChange={(e) => setFont(e.target.value)} className="text-sm">
          {Object.entries(FONTS).map(([k, v]) => <option key={k} value={v}>{k}</option>)}
        </select>
        <input type="range" min={0.85} max={1.25} step={0.05} value={scale} onChange={(e) => setScale(Number(e.target.value))} />
      </div>
      <div className="text-[10px] text-slate-400">Font & color preview</div>
    </div>
  );
};

export default ThemeSwitcher;
