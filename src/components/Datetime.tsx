"use client";
import { useState, useEffect, FC } from "react";
import ExternalComponents from "@/components/ExternalComponents";
import { DatetimeLoader } from "@/components/Loaders";

const Datetime: FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const getDate = () => {
    return new Date().toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getTime());
      setCurrentDate(getDate());
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return isLoading ? (
    <DatetimeLoader />
  ) : (
    <div className="space-y-5 md:space-y-0 p-3">
      <div className="text-slate-200 space-y-3">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-center font-monoton">
          {currentTime}
        </h1>
        <h2 className="text-lg text-center">{currentDate}</h2>
      </div>
      <ExternalComponents />
    </div>
  );
};

export default Datetime;
