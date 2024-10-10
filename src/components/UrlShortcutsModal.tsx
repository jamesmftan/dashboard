import { ChangeEvent } from "react";
import { urlShortcutsStore } from "@/lib/store";
import { X } from "lucide-react";

const UrlShortcutsModal = () => {
  const {
    isAddModalOpen,
    isEditModalOpen,
    url,
    isSaving,
    isDeleting,
    setIsUrlShortcutsModalOpen,
    setUrlShortcutsModal,
    setUrl,
    setIsSaving,
    setIsDeleting,
  } = urlShortcutsStore();

  const addUrl = async () => {
    try {
      setIsSaving(true);
      await fetch("/api/url_shortcuts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: url.name,
          url: url.url,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
      setIsUrlShortcutsModalOpen(false);
    }
  };

  const updateUrl = async () => {
    try {
      setIsSaving(true);
      await fetch("/api/url_shortcuts", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: url.id,
          name: url.name,
          url: url.url,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
      setIsUrlShortcutsModalOpen(false);
    }
  };

  const deleteUrl = async () => {
    try {
      setIsDeleting(true);
      await fetch("/api/url_shortcuts", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: url.id,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setIsUrlShortcutsModalOpen(false);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUrl({ [name]: value });
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-950 rounded-lg justify-start flex flex-col items-center w-96 gap-4 p-3">
      <div className="text-slate-950 dark:text-slate-200 justify-end flex items-center w-full">
        <button
          className="text-slate-950 dark:text-slate-200 hover:text-zinc-400 dark:hover:text-zinc-600 duration-300 cursor-pointer"
          onClick={(e) => setUrlShortcutsModal("close", e)}
        >
          <X size={20} />
        </button>
      </div>
      <div className="w-full space-y-3">
        <div className="justify-center flex flex-col items-start w-full gap-1.5">
          <label
            htmlFor="name"
            className="text-slate-950 dark:text-slate-200 ml-1"
          >
            Name
          </label>
          <input
            className="bg-slate-200 border border-slate-950 w-full rounded-[4px] outline-none p-2"
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            value={url.name}
            onChange={handleInput}
          />
        </div>
        <div className="justify-center flex flex-col items-start w-full gap-1.5">
          <label
            htmlFor="url"
            className="text-slate-950 dark:text-slate-200 ml-1"
          >
            URL
          </label>
          <input
            className="bg-slate-200 border border-slate-950 w-full rounded-[4px] outline-none p-2"
            id="url"
            name="url"
            type="text"
            placeholder="Enter URL"
            value={url.url}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="text-slate-950 dark:text-slate-200 font-medium justify-end flex items-center space-x-4 w-full">
        {isEditModalOpen && (
          <>
            <button
              className="bg-zinc-400 hover:bg-zinc-600 rounded-[4px] px-3 py-1.5 duration-300"
              onClick={deleteUrl}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-[4px] px-3 py-1.5 duration-300"
              onClick={updateUrl}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </>
        )}
        {isAddModalOpen && (
          <>
            <button
              className="bg-zinc-400 hover:bg-zinc-600 rounded-[4px] px-3 py-1.5 duration-300"
              onClick={(e) => setUrlShortcutsModal("close", e)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-[4px] px-3 py-1.5 duration-300"
              onClick={addUrl}
            >
              {isSaving ? "Adding..." : "Add"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UrlShortcutsModal;
