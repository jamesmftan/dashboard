"use client";
import { Transition } from "@headlessui/react";
import { componentStore } from "@/lib/store";

const ComingSoon = () => {
  const { visibleComponent } = componentStore();

  return (
    <Transition
      show={visibleComponent === "ComingSoon"}
      enter="transition ease-in-out duration-1000 transform"
      enterFrom="opacity-0 lg:translate-y-[1000px]"
      enterTo="opacity-100 lg:-translate-y-0"
    >
      <div className="justify-center flex items-center gap-3 p-3">
        {visibleComponent === "ComingSoon" && (
          <h1 className="text-slate-200 text-4xl">Coming Soon</h1>
        )}
      </div>
    </Transition>
  );
};

export default ComingSoon;
