import { useNavigate } from "react-router";
import { FlagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid place-items-center text-center py-24">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <h1
          color="blue-gray"
          className="mt-10 text-3xl leading-snug md:text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </h1>
        <h1 className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it. Please try refreshing the
          page or come back later.
        </h1>
        <Button
          color="gray"
          className="w-full px-4 md:w-8rem"
          onClick={() => navigate("/")} // Navigasi ke halaman utama
        >
          Back Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
