"use client";
import { useEffect } from "react";
import { LinkPreview } from "@/components/aceternity/LinkPreview";
import { Plus, EllipsisVertical } from "lucide-react";
import { Transition } from "@headlessui/react";
import { componentStore, urlShortcutsStore } from "@/lib/store";
import UrlShortcutsModal from "@/components/UrlShortcutsModal";
import { UrlShortcutsLoader } from "@/components/Loaders";

const UrlShortcuts = () => {
  const { visibleComponent } = componentStore();
  const {
    isUrlShortcutsModalOpen,
    urlShortcuts,
    isLoading,
    isSaving,
    isDeleting,
    setUrlShortcutsModal,
    setUrl,
    setUrlShortcuts,
    setIsLoading,
  } = urlShortcutsStore();

  const getUrl = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/url_shortcuts", {
        method: "GET",
      });
      const res = await response.json();
      setUrlShortcuts(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUrl();
  }, [isSaving, isDeleting]);

  return (
    <>
      {isSaving || isLoading || isDeleting ? (
        <UrlShortcutsLoader />
      ) : (
        <Transition
          show={visibleComponent === "URLShortcuts"}
          enter="transition ease-in-out duration-1000 transform"
          enterFrom="opacity-0 lg:translate-y-[1000px]"
          enterTo="opacity-100 lg:-translate-y-0"
        >
          <div className="text-slate-200 justify-center inline-grid grid-cols-4 items-start gap-4 md:gap-8 p-3">
            {visibleComponent === "URLShortcuts" &&
              urlShortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="justify-center flex flex-col items-center gap-3"
                >
                  <LinkPreview
                    url={shortcut.url}
                    className="text-slate-200 text-base md:text-2xl font-bold bg-slate-950 bg-opacity-80 rounded-md group justify-center flex flex-shrink-0 items-center w-12 h-12 md:w-16 md:h-16 relative"
                  >
                    <button
                      className="hover:bg-zinc-500 rounded-full opacity-0 group-hover:opacity-100 absolute top-0.5 right-0.5 p-1"
                      onClick={(e) => {
                        setUrlShortcutsModal("edit", e);
                        setUrl({
                          id: shortcut.id,
                          name: shortcut.name,
                          url: shortcut.url,
                        });
                      }}
                    >
                      <EllipsisVertical size={10} type="button" />
                    </button>
                    <span className="uppercase">{shortcut.name.charAt(0)}</span>
                  </LinkPreview>
                  <h1 className="text-slate-200 text-xs text-center font-medium">
                    {shortcut.name.slice(0, 8)}
                    {shortcut.name.length > 8 && "..."}
                  </h1>
                </div>
              ))}
            {visibleComponent === "URLShortcuts" && urlShortcuts.length < 8 && (
              <div className="justify-center flex flex-col items-center gap-3">
                <button
                  className="text-2xl text-slate-200 font-bold bg-slate-950 bg-opacity-80 rounded-md justify-center flex flex-shrink-0 items-center w-12 h-12 md:w-16 md:h-16"
                  onClick={(e) => setUrlShortcutsModal("add", e)}
                >
                  <Plus size={25} strokeWidth={3} />
                </button>
                <h1 className="text-slate-200 text-xs text-center font-medium">
                  Add Shortcut
                </h1>
              </div>
            )}
          </div>
        </Transition>
      )}
      <Transition
        show={isUrlShortcutsModalOpen}
        enter="transition ease-in-out duration-1000 transform"
        enterFrom="opacity-0 lg:-translate-y-[1000px]"
        enterTo="opacity-100 lg:translate-y-[0px]"
        leave="transition ease-in-out duration-1000 transform"
        leaveFrom="opacity-100 lg:translate-y-[0px]"
        leaveTo="opacity-0 lg:-translate-y-[1000px]"
      >
        <div className="justify-center flex items-start fixed inset-0 z-50 p-3">
          <UrlShortcutsModal />
        </div>
      </Transition>
    </>
  );
};

export default UrlShortcuts;
