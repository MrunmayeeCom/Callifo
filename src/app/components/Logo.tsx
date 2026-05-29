import callifoLogo from "../../assets/Callifologo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={callifoLogo}
        alt="Callifo"
        className="h-10 w-auto object-contain"
      />
    </div>
  );
}