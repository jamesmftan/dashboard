"use client";
import { ChangeEvent } from "react";
import { settingsStore } from "@/lib/store";
import { useEdgeStore } from "../lib/edgestore";
import { Loading } from "@/components/Loaders";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { User, ImageUp, Sun, Moon } from "lucide-react";

const SettingsModal = () => {
  const { settings, setIsSettingsModalOpen, setSettings } = settingsStore();
  const { edgestore } = useEdgeStore();

  const updateSettings = async () => {
    try {
      setSettings({ isSaving: true });
      let backgroundImageUrl = settings.backgroundImage;
      if (settings.file) {
        const res = await edgestore.publicFiles.upload({
          file: settings.file,
        });
        backgroundImageUrl = res.url;
      }
      await fetch("/api/settings/", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: settings.username,
          background_image: backgroundImageUrl,
          background_intensity: settings.backgroundIntensity,
          theme: settings.theme,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSettings({ isSaving: false });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSettings({
        file,
        backgroundImage: URL.createObjectURL(file),
      });
    }
  };

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.value;
    setSettings({
      theme,
      backgroundIntensity: theme === "dark" ? 30 : 100,
    });
  };

  const backgroundIntensity = {
    opacity: settings.backgroundIntensity * 0.01,
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-950 rounded-lg w-96 h-full p-3 transition-colors duration-300">
      <div
        className={cn(
          "justify-between flex flex-col items-center h-full gap-8 overflow-y-auto",
          settings.isSaving && "pointer-events-none opacity-50"
        )}
      >
        <div className="justify-start flex flex-col items-center w-full gap-8">
          <div className="justify-end flex items-center w-full">
            <X
              className="text-slate-950 dark:text-slate-200 hover:text-zinc-400 dark:hover:text-zinc-600 cursor-pointer duration-300"
              size={20}
              strokeWidth={3}
              onClick={setIsSettingsModalOpen}
            />
          </div>
          <div className="w-full space-y-3">
            <label
              htmlFor="username"
              className="text-sm text-slate-950 dark:text-slate-200 font-medium ml-1"
            >
              Username
            </label>
            <div className="flex flex-row">
              <span className="bg-blue-500 border border-r-0 border-slate-950 justify-center flex items-center rounded-l-[4px] p-2">
                <User
                  className="text-slate-950 dark:text-slate-200"
                  size={20}
                />
              </span>
              <input
                className="bg-slate-200 border border-l-0 border-slate-950 rounded-r-[4px] outline-none w-full p-2"
                id="username"
                name="username"
                value={settings.username}
                type="text"
                placeholder="Enter Username"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="w-full space-y-3">
            <div className="bg-black border-4 border-slate-950 dark:border-slate-200 rounded-[4px] justify-center flex items-center h-60">
              <img
                style={backgroundIntensity}
                className="rounded-[2px] object-cover w-full h-full"
                src={settings.backgroundImage}
                alt="background-image"
              />
            </div>
            <label
              htmlFor="backgroundImage"
              className="border-2 border-dotted border-slate-950 dark:border-slate-200 hover:bg-blue-500 rounded-[4px] justify-center flex flex-col items-center px-5 py-2.5 duration-300 cursor-pointer"
            >
              <div className="justify-center flex flex-row items-center gap-1.5">
                <ImageUp
                  className="text-slate-950 dark:text-slate-200"
                  size={20}
                />
                <p className="text-slate-950 dark:text-slate-200 font-medium">
                  Choose Wallpaper
                </p>
              </div>
              <input
                className="hidden"
                id="backgroundImage"
                name="backgroundImage"
                type="file"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="flex flex-col w-full space-y-3">
            <label
              htmlFor="backgroundIntensity"
              className="text-sm text-slate-950 dark:text-slate-200 font-medium ml-1"
            >
              Background Intensity
            </label>
            <input
              className="rounded-lg h-1 cursor-pointer transition-all duration-300"
              id="backgroundIntensity"
              name="backgroundIntensity"
              type="range"
              value={settings.backgroundIntensity}
              min={30}
              max={100}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="w-full space-y-3">
            <label
              htmlFor="theme"
              className="text-sm text-slate-950 dark:text-slate-200 font-medium ml-1"
            >
              Theme
            </label>
            <div className="justify-center flex flex-row space-x-3 items-center">
              <div className="w-full">
                <input
                  className="hidden peer"
                  id="radio_1"
                  name="theme"
                  type="radio"
                  value="light"
                  checked={settings.theme === "light"}
                  onChange={handleThemeChange}
                />
                <label
                  className="border-2 border-zinc-400 peer-checked:border-blue-500 rounded-[4px] justify-center flex flex-row items-center duration-300 gap-1.5 px-5 py-2.5 cursor-pointer"
                  htmlFor="radio_1"
                >
                  <Sun
                    className="text-slate-950 dark:text-slate-200"
                    size={15}
                  />
                  <span className="text-slate-950 dark:text-slate-200 text-xs font-medium">
                    Light
                  </span>
                </label>
              </div>
              <div className="w-full">
                <input
                  className="hidden peer"
                  id="radio_2"
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === "dark"}
                  onChange={handleThemeChange}
                />
                <label
                  className="border-2 border-zinc-400 peer-checked:border-blue-500 rounded-[4px] justify-center flex flex-row items-center duration-300 gap-1.5 px-5 py-2.5 cursor-pointer"
                  htmlFor="radio_2"
                >
                  <Moon
                    className="text-slate-950 dark:text-slate-200"
                    size={15}
                  />
                  <span className="text-slate-950 dark:text-slate-200 text-xs font-medium">
                    Dark
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="text-slate-950 dark:text-slate-200 font-medium justify-center flex flex-row items-center w-full space-x-3">
          <button
            className="bg-zinc-400 hover:bg-zinc-600 rounded-[4px] w-full px-3 py-1.5 duration-300"
            onClick={setIsSettingsModalOpen}
          >
            Close
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 justify-center flex items-center w-full rounded-[4px] gap-1.5 px-3 py-1.5 duration-300"
            onClick={updateSettings}
          >
            {settings.isSaving ? (
              <>
                <Loading className="w-5 h-5" />
                <span>Saving...</span>
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
