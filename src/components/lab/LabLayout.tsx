import { LabSidebar } from "./LabSidebar";

interface LabLayoutProps {
  children: React.ReactNode;
}

export function LabLayout({ children }: LabLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <LabSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}