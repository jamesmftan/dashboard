"use client";
import { useEffect } from "react";
import Datetime from "@/components/Datetime";
import UrlShortcuts from "@/components/UrlShortcuts";
import Quote from "@/components/Quote";
import SettingsButton from "@/components/SettingsButton";
import ComingSoon from "@/components/ComingSoon";
import { cn } from "@/utils/cn";
import { settingsStore } from "@/lib/store";

export default function Dashboard() {
  const { settings, setSettings } = settingsStore();

  const getSettings = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "GET",
      });
      const res = await response.json();
      setSettings({
        username: res.data.data.username,
        backgroundImage: res.data.data.background_image,
        backgroundIntensity: res.data.data.background_intensity,
        theme: res.data.data.theme,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSettings({ isLoading: false });
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const backgroundImage = {
    backgroundImage: `url(${settings.backgroundImage})`,
  };

  const backgroundIntensity = {
    backgroundColor: `rgba(0, 0, 0, ${
      1 - settings.backgroundIntensity * 0.01
    })`,
  };

  return (
    <div
      className={cn(
        "grid h-screen",
        settings.theme === "dark" ? "dark" : "light"
      )}
    >
      <div
        style={backgroundImage}
        className="bg-top md:bg-center bg-fixed bg-cover bg-no-repeat"
      >
        <div
          style={backgroundIntensity}
          className="justify-center flex flex-row h-full p-4"
        >
          <div className="hidden xl:flex flex-col w-full h-full p-4">
            <div className="flex w-full h-full"></div>
          </div>
          <div className="flex flex-col w-full h-full p-4">
            <div className="justify-start flex flex-col items-center w-full h-full space-y-5">
              <Datetime />
            </div>
            <div className="justify-center flex flex-col items-center w-full h-full">
              <UrlShortcuts />
              <ComingSoon />
            </div>
            <div className="flex w-full h-full"></div>
          </div>
          <div className="hidden xl:flex flex-col w-full h-full p-4">
            <div className="justify-end flex items-start w-full h-full">
              <Quote />
            </div>
            <div className="w-full h-full"></div>
            <div className="justify-end flex items-end w-full h-full">
              <SettingsButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
