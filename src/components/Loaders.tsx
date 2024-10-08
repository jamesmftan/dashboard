import { FC } from "react";
import { cn } from "@/utils/cn";

interface ClassName {
  className: string;
}

export const Loading: FC<ClassName> = ({ className }) => {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "inline text-slate-700 animate-spin fill-slate-500",
        className
      )}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
};

export const DashboardIcon: FC<ClassName> = ({ className }) => {
  return (
    <svg
      className={cn("", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm-1 7a1 1 0 001 1h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4zm10 0a1 1 0 001 1h6a1 1 0 001-1v-7a1 1 0 00-1-1h-6a1 1 0 00-1 1v7zm1-10h6a1 1 0 001-1V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v5a1 1 0 001 1z" />
    </svg>
  );
};

export const DatetimeLoader = () => {
  return (
    <div className="animate-pulse w-full space-y-3 p-3">
      <h1 className="h-16 bg-slate-700 rounded-lg"></h1>
      <h2 className="h-8 bg-slate-700 rounded-lg"></h2>
      <h2 className="h-8 bg-slate-700 rounded-lg"></h2>
    </div>
  );
};

export const UrlShortcutsLoader = () => {
  return (
    <div className="animate-pulse flex justify-center p-3">
      <div className="grid grid-cols-4 gap-8">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-slate-700 w-16 h-16 rounded-md"
            ></div>
          ))}
      </div>
    </div>
  );
};

export const QuoteLoader = () => {
  return (
    <div className="animate-pulse text-slate-200 justify-center flex flex-col items-end w-1/2 space-y-2 p-3">
      <p className="h-16 rounded-lg bg-slate-700 w-full"></p>
      <h1 className="h-8 rounded-lg bg-slate-700 w-full"></h1>
    </div>
  );
};

export const SettingsButtonLoader = () => {
  return (
    <div className="animate-pulse text-slate-200 font-bold justify-end flex flex-row items-center w-1/2 space-x-3 p-3">
      <div className="bg-slate-700 w-full h-8 rounded-lg"></div>
      <div className="bg-slate-700 w-8 h-8 rounded-full"></div>
    </div>
  );
};
