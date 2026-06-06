import BugBackground from "../component/buglogo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative  flex items-center justify-center overflow-hidden bg-background">

      {/* Background Bug */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none ">
        <BugBackground />
      </div>

      {/* Auth Card */}
      <div className="relative z-20 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}