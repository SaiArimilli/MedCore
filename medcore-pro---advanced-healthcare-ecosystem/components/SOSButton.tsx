import React from 'react';

const EMERGENCY_NUMBER = '18006332273'; // 1-800-MED-CARE

const SOSButton: React.FC = () => {
  const handleClick = async () => {
    const confirmCall = window.confirm('Call emergency services at 1-800-MED-CARE?');
    if (!confirmCall) return;

    // Try to get geolocation to inform user — we can't pass it to a phone call,
    // but we can show it or copy it to clipboard so they can share it when connected.
    if ('geolocation' in navigator) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 });
        });
        const coords = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
        // Try to copy coords to clipboard to help user share location if needed
        try {
          await navigator.clipboard.writeText(coords);
          // notify user then initiate call
          alert(`Location copied to clipboard: ${coords}\nDialing emergency number now.`);
        } catch (err) {
          // fallback notify
          alert(`Got location: ${coords}. Dialing emergency number now.`);
        }
      } catch (err) {
        // geolocation failed or denied — continue to call
        // no-op
      }
    }

    // Initiate phone call — mobile browsers will open dialer. Desktop will try to open an app.
    window.location.href = `tel:${EMERGENCY_NUMBER}`;
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
      title="Call emergency services"
    >
      SOS Button
    </button>
  );
};

export default SOSButton;
