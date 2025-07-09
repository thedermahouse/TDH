import DialogProvider from "@/context/DialogProvider";
import Sidebar from "./Sidebar";

export default function AdminPanelWrapper({ children }) {
  return (
    <DialogProvider>
      <div className="bg-gray-900 h-screen w-full">
        <div className="w-full h-full flex">
          <div className="w-12 h-full">
            <Sidebar />
          </div>
          <div className="grow h-full">
            <div className="h-full w-full overflow-y-scroll">
              <div className="rounded-xl w-full h-full p-16">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </DialogProvider>
  );
}
