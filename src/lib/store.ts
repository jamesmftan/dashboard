import { create } from "zustand";

//Settings
interface settings {
  username: string;
  file?: File;
  backgroundImage: string;
  backgroundIntensity: number;
  theme: string;
  isSaving: boolean;
  isLoading: boolean;
}

interface settingsState {
  settings: settings;
  setSettings: (newSettings: Partial<settings>) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: () => void;
}

export const settingsStore = create<settingsState>((set) => ({
  settings: {
    username: "",
    file: undefined,
    backgroundImage: "",
    backgroundIntensity: 0,
    theme: "",
    isSaving: false,
    isLoading: true,
  },

  setSettings: (newSettings: Partial<settings>) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  isSettingsModalOpen: false,
  setIsSettingsModalOpen: () =>
    set((state) => ({ isSettingsModalOpen: !state.isSettingsModalOpen })),
}));

//External Components
interface externalComponentState {
  visibleComponent: string;
  setVisibleComponent: (visibleComponent: string) => void;
}

export const componentStore = create<externalComponentState>((set) => ({
  visibleComponent: "URLShortcuts",
  setVisibleComponent: (visibleComponent: string) => set({ visibleComponent }),
}));

//Url Shortcuts
interface url {
  id: number;
  name: string;
  url: string;
}

interface urlShortcutsState {
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  isUrlShortcutsModalOpen: boolean;
  setUrlShortcutsModal: (
    modalType: "add" | "edit" | "close",
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  setIsUrlShortcutsModalOpen(value: boolean): void;

  url: url;
  setUrl: (newUrl: Partial<url>) => void;

  urlShortcuts: url[];
  setUrlShortcuts: (newUrlShortcuts: url[]) => void;

  isLoading: boolean;
  setIsLoading(value: boolean): void;

  isSaving: boolean;
  setIsSaving(value: boolean): void;

  isDeleting: boolean;
  setIsDeleting(value: boolean): void;
}

export const urlShortcutsStore = create<urlShortcutsState>((set) => ({
  isEditModalOpen: false,
  isAddModalOpen: false,
  isUrlShortcutsModalOpen: false,
  setUrlShortcutsModal: (modalType, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (modalType === "add") {
      set({ url: { id: 0, name: "", url: "" } });
    }
    set({
      isAddModalOpen: modalType === "add",
      isEditModalOpen: modalType === "edit",
      isUrlShortcutsModalOpen: modalType !== "close",
    });
  },
  setIsUrlShortcutsModalOpen: () => set({ isUrlShortcutsModalOpen: false }),

  url: {
    id: 0,
    name: "",
    url: "",
  },
  setUrl: (newUrl: Partial<url>) =>
    set((state) => ({
      url: { ...state.url, ...newUrl },
    })),

  urlShortcuts: [],
  setUrlShortcuts: (newUrlShortcuts: url[]) =>
    set(() => ({
      urlShortcuts: newUrlShortcuts,
    })),

  isSaving: false,
  setIsSaving: (saving: boolean) => set({ isSaving: saving }),

  isLoading: true,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  isDeleting: false,
  setIsDeleting: (deleting: boolean) => set({ isDeleting: deleting }),
}));
