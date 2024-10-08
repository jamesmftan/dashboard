"use client";
import SettingsModal from "@/components/SettingsModal";
import { Settings } from "lucide-react";
import { Transition } from "@headlessui/react";
import { settingsStore } from "@/lib/store";
import { SettingsButtonLoader } from "@/components/Loaders";

const SettingsButton = () => {
  const { settings, setIsSettingsModalOpen, isSettingsModalOpen } =
    settingsStore();

  return (
    <>
      {settings.isLoading ? (
        <SettingsButtonLoader />
      ) : (
        <div className="text-slate-200 font-bold justify-end flex flex-row items-center w-1/2 space-x-2 p-3">
          <h1>{settings.username}</h1>
          <Settings
            className="cursor-pointer"
            size={20}
            strokeWidth={3}
            onClick={setIsSettingsModalOpen}
          />
        </div>
      )}
      <Transition
        show={isSettingsModalOpen}
        enter="transition ease-in-out duration-1000 transform"
        enterFrom="lg:translate-x-[1000px]"
        enterTo="lg:-translate-x-0"
        leave="transition ease-in-out duration-1000 transform"
        leaveFrom="lg:-translate-x-0"
        leaveTo="lg:translate-x-[1000px]"
      >
        <div className="justify-end flex items-center fixed inset-0 z-50 p-3">
          <SettingsModal />
        </div>
      </Transition>
    </>
  );
};

export default SettingsButton;
