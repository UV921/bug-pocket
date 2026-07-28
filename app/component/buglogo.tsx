import { BugPocketLogo } from "@/components/bugpocket-logo";

/** Large watermark mark used behind auth forms */
export default function BugBackground() {
  return (
    <BugPocketLogo
      decorative
      className="h-[28rem] w-[28rem] text-current"
    />
  );
}
