import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="relative max-w-md mx-auto mb-10">
      {/* INPUT */}
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 py-3 rounded-xl backdrop-blur border border-primary/90 text-primary placeholder:text-primary/80 focus:ring-2 focus:ring-primary/40"
      />

      {/* ICON SEARCH */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />

      {/* CLEAR BUTTON */}
      {value && (
        <Button
          onClick={() => onChange("")}
          variant={"ghost"}
          className="absolute hover:bg-transparent right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
