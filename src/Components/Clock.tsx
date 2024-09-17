import React, { useState, useEffect, CSSProperties } from "react";

interface SegmentStyle extends CSSProperties {
  position: "absolute";
  backgroundColor: string;
  transition: string;
}

const segmentStyles: SegmentStyle = {
  position: "absolute",
  backgroundColor: "#333",
  transition: "opacity 0.2s",
};

const horizontalSegment: CSSProperties = {
  ...segmentStyles,
  height: "10%",
  width: "100%",
  left: "0%",
};

const verticalSegment: CSSProperties = {
  ...segmentStyles,
  width: "10%",
  height: "45%",
};

interface SegmentProps {
  on: number[];
  style: CSSProperties;
}

interface DigitProps {
  value: number;
}

const Digit: React.FC<DigitProps> = ({ value }) => {
  const segments: SegmentProps[] = [
    {
      on: [0, 2, 3, 5, 6, 7, 8, 9],
      style: { ...horizontalSegment, top: "0%" },
    },
    {
      on: [0, 4, 5, 6, 8, 9],
      style: { ...verticalSegment, top: "0%", left: "0%" },
    },
    {
      on: [0, 1, 2, 3, 4, 7, 8, 9],
      style: { ...verticalSegment, top: "0%", right: "0%" },
    },
    { on: [2, 3, 4, 5, 6, 8, 9], style: { ...horizontalSegment, top: "45%" } },
    { on: [0, 2, 6, 8], style: { ...verticalSegment, top: "50%", left: "0%" } },
    {
      on: [0, 1, 3, 4, 5, 6, 7, 8, 9],
      style: { ...verticalSegment, top: "50%", right: "0%" },
    },
    { on: [0, 2, 3, 5, 6, 8, 9], style: { ...horizontalSegment, top: "90%" } },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "60px",
        height: "100px",
        margin: "0 5px",
      }}
    >
      {segments.map((segment, index) => (
        <div
          key={index}
          style={{
            ...segment.style,
            opacity: segment.on.includes(value) ? 1 : 0.1,
          }}
        />
      ))}
    </div>
  );
};

const Colon: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      height: "100px",
      margin: "0 5px",
    }}
  >
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "#333",
        borderRadius: "50%",
      }}
    />
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "#333",
        borderRadius: "50%",
      }}
    />
  </div>
);

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Digit value={parseInt(hours[0])} />
        <Digit value={parseInt(hours[1])} />
        <Colon />
        <Digit value={parseInt(minutes[0])} />
        <Digit value={parseInt(minutes[1])} />
        <Colon />
        <Digit value={parseInt(seconds[0])} />
        <Digit value={parseInt(seconds[1])} />
      </div>
    </div>
  );
};

export default Clock;
