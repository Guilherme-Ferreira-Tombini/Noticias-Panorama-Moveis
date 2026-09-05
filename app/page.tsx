import Advertisemets from "@/components/Advertisements";
import Notices from "@/components/Notices";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-auto items-center justify-center p-4">
      <Advertisemets/>
      <Notices/>
    </div>
  );
}
