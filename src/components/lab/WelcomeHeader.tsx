import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

interface WelcomeHeaderProps {
  username?: string;
  className?: string;
}

export function WelcomeHeader({ username = "Dr. Sarah Johnson", className }: WelcomeHeaderProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Welcome, {username}!
              </h2>
              <p className="text-muted-foreground">
                Ready to manage your laboratory operations
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-medium">{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}