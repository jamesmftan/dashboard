import { DashboardIcon } from "@/components/Loaders";

export default function loading() {
  return (
    <div className="bg-slate-950 justify-center flex items-center gap-3 h-screen">
      <DashboardIcon className="text-slate-200 w-20 h-20" />
      <div className="justify-center flex flex-col items-start gap-1.5">
        <p className="text-3xl text-gray-200">Dashboard</p>
        <p className="text-lg text-gray-200">by jmftan</p>
      </div>
    </div>
  );
}
