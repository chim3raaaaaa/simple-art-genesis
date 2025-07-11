import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface ConnectionStatusProps {
  className?: string;
}

interface ConnectionStatus {
  azurMind: {
    status: 'connected' | 'disconnected' | 'error';
    lastChecked: string;
    message?: string;
  };
  sharePoint: {
    status: 'connected' | 'disconnected' | 'error';
    lastChecked: string;
    message?: string;
  };
}

export function ConnectionStatus({ className }: ConnectionStatusProps) {
  const [connections, setConnections] = useState<ConnectionStatus>({
    azurMind: {
      status: 'connected',
      lastChecked: new Date().toLocaleTimeString(),
    },
    sharePoint: {
      status: 'disconnected',
      lastChecked: new Date().toLocaleTimeString(),
      message: 'Authentication required'
    }
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'disconnected':
        return 'bg-red-500/20 text-red-700 border-red-500/30';
      case 'error':
        return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const refreshConnections = async () => {
    setIsRefreshing(true);
    // Simulate API calls to check connections
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnections(prev => ({
      azurMind: {
        ...prev.azurMind,
        lastChecked: new Date().toLocaleTimeString(),
      },
      sharePoint: {
        ...prev.sharePoint,
        lastChecked: new Date().toLocaleTimeString(),
      }
    }));
    setIsRefreshing(false);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshConnections}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(connections.azurMind.status)}
            <span className="text-sm font-medium">AzurMind</span>
          </div>
          <Badge className={getStatusColor(connections.azurMind.status)}>
            {connections.azurMind.status}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(connections.sharePoint.status)}
            <span className="text-sm font-medium">SharePoint Excel</span>
          </div>
          <Badge className={getStatusColor(connections.sharePoint.status)}>
            {connections.sharePoint.status}
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last checked: {connections.azurMind.lastChecked}
        </div>
      </CardContent>
    </Card>
  );
}