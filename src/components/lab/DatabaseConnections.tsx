import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Database, TestTube, Save } from "lucide-react";
import { useState } from "react";

interface ConnectionConfig {
  azurMind: {
    url: string;
    apiKey: string;
    timeout: string;
    enabled: boolean;
  };
  sharePoint: {
    siteUrl: string;
    username: string;
    password: string;
    filePath: string;
    enabled: boolean;
  };
}

export function DatabaseConnections() {
  const [config, setConfig] = useState<ConnectionConfig>({
    azurMind: {
      url: 'https://api.azurmind.com/v1',
      apiKey: '',
      timeout: '30',
      enabled: true
    },
    sharePoint: {
      siteUrl: 'https://ubpmauritius.sharepoint.com/sites/lab',
      username: '',
      password: '',
      filePath: '/Shared Documents/LabData.xlsx',
      enabled: true
    }
  });

  const [testResults, setTestResults] = useState<{
    azurMind?: { success: boolean; message: string };
    sharePoint?: { success: boolean; message: string };
  }>({});

  const [isTesting, setIsTesting] = useState<{
    azurMind: boolean;
    sharePoint: boolean;
  }>({ azurMind: false, sharePoint: false });

  const testAzurMindConnection = async () => {
    setIsTesting(prev => ({ ...prev, azurMind: true }));
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const success = config.azurMind.url && config.azurMind.apiKey;
    setTestResults(prev => ({
      ...prev,
      azurMind: {
        success,
        message: success ? 'Connection successful!' : 'Invalid URL or API key'
      }
    }));
    
    setIsTesting(prev => ({ ...prev, azurMind: false }));
  };

  const testSharePointConnection = async () => {
    setIsTesting(prev => ({ ...prev, sharePoint: true }));
    
    // Simulate SharePoint test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const success = config.sharePoint.siteUrl && config.sharePoint.username && config.sharePoint.password;
    setTestResults(prev => ({
      ...prev,
      sharePoint: {
        success,
        message: success ? 'SharePoint connection successful!' : 'Invalid credentials or site URL'
      }
    }));
    
    setIsTesting(prev => ({ ...prev, sharePoint: false }));
  };

  const saveConfiguration = () => {
    // Save configuration logic here
    console.log('Saving configuration:', config);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>AzurMind Connection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable AzurMind Integration</Label>
              <p className="text-sm text-muted-foreground">
                Connect to AzurMind for advanced analytics
              </p>
            </div>
            <Switch
              checked={config.azurMind.enabled}
              onCheckedChange={(checked) =>
                setConfig(prev => ({
                  ...prev,
                  azurMind: { ...prev.azurMind, enabled: checked }
                }))
              }
            />
          </div>
          
          {config.azurMind.enabled && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="azurMindUrl">API URL</Label>
                  <Input
                    id="azurMindUrl"
                    value={config.azurMind.url}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        azurMind: { ...prev.azurMind, url: e.target.value }
                      }))
                    }
                    placeholder="https://api.azurmind.com/v1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="azurMindTimeout">Timeout (seconds)</Label>
                  <Input
                    id="azurMindTimeout"
                    value={config.azurMind.timeout}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        azurMind: { ...prev.azurMind, timeout: e.target.value }
                      }))
                    }
                    placeholder="30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="azurMindApiKey">API Key</Label>
                <Input
                  id="azurMindApiKey"
                  type="password"
                  value={config.azurMind.apiKey}
                  onChange={(e) =>
                    setConfig(prev => ({
                      ...prev,
                      azurMind: { ...prev.azurMind, apiKey: e.target.value }
                    }))
                  }
                  placeholder="Enter your AzurMind API key"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={testAzurMindConnection}
                  disabled={isTesting.azurMind}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  {isTesting.azurMind ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>
              
              {testResults.azurMind && (
                <Alert>
                  <div className="flex items-center space-x-2">
                    {testResults.azurMind.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <AlertDescription>{testResults.azurMind.message}</AlertDescription>
                  </div>
                </Alert>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>SharePoint Excel Database</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable SharePoint Integration</Label>
              <p className="text-sm text-muted-foreground">
                Connect to SharePoint-hosted Excel database
              </p>
            </div>
            <Switch
              checked={config.sharePoint.enabled}
              onCheckedChange={(checked) =>
                setConfig(prev => ({
                  ...prev,
                  sharePoint: { ...prev.sharePoint, enabled: checked }
                }))
              }
            />
          </div>
          
          {config.sharePoint.enabled && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sharePointSite">SharePoint Site URL</Label>
                <Input
                  id="sharePointSite"
                  value={config.sharePoint.siteUrl}
                  onChange={(e) =>
                    setConfig(prev => ({
                      ...prev,
                      sharePoint: { ...prev.sharePoint, siteUrl: e.target.value }
                    }))
                  }
                  placeholder="https://yourcompany.sharepoint.com/sites/lab"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sharePointUsername">Username</Label>
                  <Input
                    id="sharePointUsername"
                    value={config.sharePoint.username}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        sharePoint: { ...prev.sharePoint, username: e.target.value }
                      }))
                    }
                    placeholder="user@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sharePointPassword">Password</Label>
                  <Input
                    id="sharePointPassword"
                    type="password"
                    value={config.sharePoint.password}
                    onChange={(e) =>
                      setConfig(prev => ({
                        ...prev,
                        sharePoint: { ...prev.sharePoint, password: e.target.value }
                      }))
                    }
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sharePointFilePath">Excel File Path</Label>
                <Input
                  id="sharePointFilePath"
                  value={config.sharePoint.filePath}
                  onChange={(e) =>
                    setConfig(prev => ({
                      ...prev,
                      sharePoint: { ...prev.sharePoint, filePath: e.target.value }
                    }))
                  }
                  placeholder="/Shared Documents/LabData.xlsx"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={testSharePointConnection}
                  disabled={isTesting.sharePoint}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  {isTesting.sharePoint ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>
              
              {testResults.sharePoint && (
                <Alert>
                  <div className="flex items-center space-x-2">
                    {testResults.sharePoint.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <AlertDescription>{testResults.sharePoint.message}</AlertDescription>
                  </div>
                </Alert>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveConfiguration}>
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}