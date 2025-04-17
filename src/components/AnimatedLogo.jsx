import React, { useEffect, useRef } from "react";

const AnimatedLogo = () => {
  const borderRef = useRef(null);

  useEffect(() => {
    let timeout, interval;

    function triggerAnimation() {
      const border = borderRef.current;
      if (border) {
        // Başlangıç: çizgi görünür ve başa alınır
        border.style.transition = "none";
        border.setAttribute("stroke-dashoffset", 0);
        border.style.strokeOpacity = "1";

        // 10ms sonra animasyon başlasın
        setTimeout(() => {
          border.style.transition = "stroke-dashoffset 0.4s linear, stroke-opacity 0.2s 0.2s";
          border.setAttribute("stroke-dashoffset", 267); // Çevre uzunluğu kadar
          border.style.strokeOpacity = "0";
        }, 50);
      }
      timeout = setTimeout(triggerAnimation, 5000);
    }

    triggerAnimation();
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="bg-gradient" x1="0" y1="1" x2="1.1" y2="1">
          <stop offset="0%" stopColor="#183153" />
          <stop offset="100%" stopColor="#125951" />
        </linearGradient>
        <filter id="glow" x="-10" y="-10" width="84" height="84">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#bg-gradient)" />
      <rect
        ref={borderRef}
        x="2"
        y="2"
        width="60"
        height="60"
        rx="12"
        fill="none"
        stroke="#D8DB0F"
        strokeWidth="4"
        strokeDasharray="60 207"
        strokeDashoffset="267"
        filter="url(#glow)"
        opacity="0.9"
        style={{
          strokeOpacity: 0,
        }}
      />
      <text
        x="48%"
        y="59%"
        textAnchor="middle"
        fontFamily="Verdana, sans-serif"
        fontSize="50"
        fontWeight="700"
        fill="#fff"
        dominantBaseline="middle"
      >
        B
      </text>
    </svg>
  );
};

export default AnimatedLogo;