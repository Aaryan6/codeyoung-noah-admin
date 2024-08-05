import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="">
        <LoaderIcon size={30} className="animate-spin" />
      </div>
    </div>
  );
}
