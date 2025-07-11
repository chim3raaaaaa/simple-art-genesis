import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, Database, TestTube, Save, Info, FileText, Globe, Server } from "lucide-react";
import { useState } from "react";

interface AzurMindConfig {
  enabled: boolean;
  connectionType: 'api' | 'database' | 'file' | 'webservice';
  api: {
    url: string;
    apiKey: string;
    timeout: string;
    version: string;
  };
  database: {
    type: 'mssql' | 'oracle' | 'mysql' | 'postgresql' | 'odbc';
    server: string;
    port: string;
    database: string;
    username: string;
    password: string;
    connectionString: string;
    useWindowsAuth: boolean;
  };
  fileTransfer: {
    type: 'ftp' | 'sftp' | 'network' | 'email';
    host: string;
    port: string;
    username: string;
    password: string;
    path: string;
    schedule: string;
    format: 'csv' | 'xml' | 'json' | 'excel';
  };
  webService: {
    wsdlUrl: string;
    soapAction: string;
    username: string;
    password: string;
    endpoint: string;
    namespace: string;
  };
}

interface SharePointConfig {
  enabled: boolean;
  siteUrl: string;
  username: string;
  password: string;
  filePath: string;
  authType: 'basic' | 'ntlm' | 'oauth';
  clientId: string;
  clientSecret: string;
  tenantId: string;
}

export function DatabaseConnections() {
  const [azurMindConfig, setAzurMindConfig] = useState<AzurMindConfig>({
    enabled: true,
    connectionType: 'api',
    api: {
      url: 'https://api.azurmind.com/v1',
      apiKey: '',
      timeout: '30',
      version: 'v1'
    },
    database: {
      type: 'mssql',
      server: 'azurmind-db.company.com',
      port: '1433',
      database: 'AzurMindDB',
      username: 'lab_user',
      password: '',
      connectionString: '',
      useWindowsAuth: false
    },
    fileTransfer: {
      type: 'ftp',
      host: 'ftp.azurmind.com',
      port: '21',
      username: 'lab_export',
      password: '',
      path: '/exports/lab_data',
      schedule: 'hourly',
      format: 'csv'
    },
    webService: {
      wsdlUrl: 'http://azurmind.com/services/LabService.asmx?wsdl',
      soapAction: 'http://azurmind.com/GetLabData',
      username: 'lab_service',
      password: '',
      endpoint: 'http://azurmind.com/services/LabService.asmx',
      namespace: 'http://azurmind.com/'
    }
  });

  const [sharePointConfig, setSharePointConfig] = useState<SharePointConfig>({
    enabled: true,
    siteUrl: 'https://ubpmauritius.sharepoint.com/sites/lab',
    username: '',
    password: '',
    filePath: '/Shared Documents/LabData.xlsx',
    authType: 'basic',
    clientId: '',
    clientSecret: '',
    tenantId: ''
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
    
    // Simulate connection test based on type
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let success = false;
    let message = '';

    switch (azurMindConfig.connectionType) {
      case 'api':
        success = azurMindConfig.api.url && azurMindConfig.api.apiKey;
        message = success ? 'API connection successful!' : 'Invalid API URL or key';
        break;
      case 'database':
        success = azurMindConfig.database.server && azurMindConfig.database.database;
        message = success ? 'Database connection successful!' : 'Invalid database credentials';
        break;
      case 'file':
        success = azurMindConfig.fileTransfer.host && azurMindConfig.fileTransfer.path;
        message = success ? 'File transfer connection successful!' : 'Invalid FTP/file settings';
        break;
      case 'webservice':
        success = azurMindConfig.webService.wsdlUrl && azurMindConfig.webService.endpoint;
        message = success ? 'Web service connection successful!' : 'Invalid web service configuration';
        break;
    }
    
    setTestResults(prev => ({
      ...prev,
      azurMind: { success, message }
    }));
    
    setIsTesting(prev => ({ ...prev, azurMind: false }));
  };

  const testSharePointConnection = async () => {
    setIsTesting(prev => ({ ...prev, sharePoint: true }));
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const success = sharePointConfig.siteUrl && 
      ((sharePointConfig.authType === 'basic' && sharePointConfig.username && sharePointConfig.password) ||
       (sharePointConfig.authType === 'oauth' && sharePointConfig.clientId && sharePointConfig.clientSecret));
    
    setTestResults(prev => ({
      ...prev,
      sharePoint: {
        success,
        message: success ? 'SharePoint connection successful!' : 'Invalid credentials or configuration'
      }
    }));
    
    setIsTesting(prev => ({ ...prev, sharePoint: false }));
  };

  const saveConfiguration = () => {
    console.log('Saving configuration:', { azurMindConfig, sharePointConfig });
    // Implementation would save to secure backend
  };

  return (
    <div className="space-y-6">
      {/* AzurMind Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>AzurMind Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable AzurMind Integration</Label>
              <p className="text-sm text-muted-foreground">
                Connect to AzurMind system for data synchronization
              </p>
            </div>
            <Switch
              checked={azurMindConfig.enabled}
              onCheckedChange={(checked) =>
                setAzurMindConfig(prev => ({ ...prev, enabled: checked }))
              }
            />
          </div>
          
          {azurMindConfig.enabled && (
            <>
              <Separator />
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Integration Options:</strong> Choose the best method based on your AzurMind system capabilities.
                  Contact your AzurMind administrator for the required connection details.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="connectionType">Connection Method</Label>
                <Select 
                  value={azurMindConfig.connectionType} 
                  onValueChange={(value: any) =>
                    setAzurMindConfig(prev => ({ ...prev, connectionType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">Modern REST API</SelectItem>
                    <SelectItem value="database">Direct Database Connection</SelectItem>
                    <SelectItem value="file">File Transfer (FTP/SFTP)</SelectItem>
                    <SelectItem value="webservice">Legacy Web Service (SOAP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs value={azurMindConfig.connectionType} className="w-full">
                <TabsContent value="api" className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Modern REST API</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Best option for modern AzurMind installations. Requires API endpoint and authentication key.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="apiUrl">API Base URL</Label>
                      <Input
                        id="apiUrl"
                        value={azurMindConfig.api.url}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            api: { ...prev.api, url: e.target.value }
                          }))
                        }
                        placeholder="https://api.azurmind.com/v1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiVersion">API Version</Label>
                      <Select 
                        value={azurMindConfig.api.version}
                        onValueChange={(value) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            api: { ...prev.api, version: value }
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1">Version 1.0</SelectItem>
                          <SelectItem value="v2">Version 2.0</SelectItem>
                          <SelectItem value="latest">Latest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key / Token</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        value={azurMindConfig.api.apiKey}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            api: { ...prev.api, apiKey: e.target.value }
                          }))
                        }
                        placeholder="Enter your API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiTimeout">Timeout (seconds)</Label>
                      <Input
                        id="apiTimeout"
                        value={azurMindConfig.api.timeout}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            api: { ...prev.api, timeout: e.target.value }
                          }))
                        }
                        placeholder="30"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="database" className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Server className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Direct Database Connection</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Connect directly to AzurMind database. Requires database server access and credentials.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dbType">Database Type</Label>
                    <Select 
                      value={azurMindConfig.database.type}
                      onValueChange={(value: any) =>
                        setAzurMindConfig(prev => ({
                          ...prev,
                          database: { ...prev.database, type: value }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mssql">Microsoft SQL Server</SelectItem>
                        <SelectItem value="oracle">Oracle Database</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="odbc">Generic ODBC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dbServer">Server/Host</Label>
                      <Input
                        id="dbServer"
                        value={azurMindConfig.database.server}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            database: { ...prev.database, server: e.target.value }
                          }))
                        }
                        placeholder="azurmind-db.company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dbPort">Port</Label>
                      <Input
                        id="dbPort"
                        value={azurMindConfig.database.port}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            database: { ...prev.database, port: e.target.value }
                          }))
                        }
                        placeholder="1433"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dbName">Database Name</Label>
                      <Input
                        id="dbName"
                        value={azurMindConfig.database.database}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            database: { ...prev.database, database: e.target.value }
                          }))
                        }
                        placeholder="AzurMindDB"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={azurMindConfig.database.useWindowsAuth}
                      onCheckedChange={(checked) =>
                        setAzurMindConfig(prev => ({
                          ...prev,
                          database: { ...prev.database, useWindowsAuth: checked }
                        }))
                      }
                    />
                    <Label>Use Windows Authentication</Label>
                  </div>

                  {!azurMindConfig.database.useWindowsAuth && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dbUsername">Username</Label>
                        <Input
                          id="dbUsername"
                          value={azurMindConfig.database.username}
                          onChange={(e) =>
                            setAzurMindConfig(prev => ({
                              ...prev,
                              database: { ...prev.database, username: e.target.value }
                            }))
                          }
                          placeholder="lab_user"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dbPassword">Password</Label>
                        <Input
                          id="dbPassword"
                          type="password"
                          value={azurMindConfig.database.password}
                          onChange={(e) =>
                            setAzurMindConfig(prev => ({
                              ...prev,
                              database: { ...prev.database, password: e.target.value }
                            }))
                          }
                          placeholder="Enter password"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="connectionString">Custom Connection String (Optional)</Label>
                    <Textarea
                      id="connectionString"
                      value={azurMindConfig.database.connectionString}
                      onChange={(e) =>
                        setAzurMindConfig(prev => ({
                          ...prev,
                          database: { ...prev.database, connectionString: e.target.value }
                        }))
                      }
                      placeholder="Server=server;Database=db;Trusted_Connection=true;"
                      rows={2}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="file" className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-800">File Transfer Integration</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Import/export data via file transfer. Good for batch processing and legacy systems.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transferType">Transfer Method</Label>
                      <Select 
                        value={azurMindConfig.fileTransfer.type}
                        onValueChange={(value: any) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            fileTransfer: { ...prev.fileTransfer, type: value }
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ftp">FTP</SelectItem>
                          <SelectItem value="sftp">SFTP (Secure)</SelectItem>
                          <SelectItem value="network">Network Share</SelectItem>
                          <SelectItem value="email">Email Attachment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fileFormat">File Format</Label>
                      <Select 
                        value={azurMindConfig.fileTransfer.format}
                        onValueChange={(value: any) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            fileTransfer: { ...prev.fileTransfer, format: value }
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="xml">XML</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ftpHost">Host/Server</Label>
                      <Input
                        id="ftpHost"
                        value={azurMindConfig.fileTransfer.host}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            fileTransfer: { ...prev.fileTransfer, host: e.target.value }
                          }))
                        }
                        placeholder="ftp.azurmind.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ftpPort">Port</Label>
                      <Input
                        id="ftpPort"
                        value={azurMindConfig.fileTransfer.port}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            fileTransfer: { ...prev.fileTransfer, port: e.target.value }
                          }))
                        }
                        placeholder="21"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ftpPath">Remote Path</Label>
                      <Input
                        id="ftpPath"
                        value={azurMindConfig.fileTransfer.path}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            fileTransfer: { ...prev.fileTransfer, path: e.target.value }
                          }))
                        }
                        placeholder="/exports/lab_data"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ftpUsername">Username</Label>
                      <Input
                        id="ftpUsername"
                        value={azurMindConfig.fileTransfer.username}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            fileTransfer: { ...prev.fileTransfer, username: e.target.value }
                          }))
                        }
                        placeholder="lab_export"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ftpPassword">Password</Label>
                      <Input
                        id="ftpPassword"
                        type="password"
                        value={azurMindConfig.fileTransfer.password}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            fileTransfer: { ...prev.fileTransfer, password: e.target.value }
                          }))
                        }
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="syncSchedule">Sync Schedule</Label>
                      <Select 
                        value={azurMindConfig.fileTransfer.schedule}
                        onValueChange={(value) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            fileTransfer: { ...prev.fileTransfer, schedule: value }
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="webservice" className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">Legacy Web Service (SOAP)</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      For older AzurMind systems using SOAP web services. Requires WSDL URL and service details.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wsdlUrl">WSDL URL</Label>
                    <Input
                      id="wsdlUrl"
                      value={azurMindConfig.webService.wsdlUrl}
                      onChange={(e) =>
                        setAzurMindConfig(prev => ({
                          ...prev,
                          webService: { ...prev.webService, wsdlUrl: e.target.value }
                        }))
                      }
                      placeholder="http://azurmind.com/services/LabService.asmx?wsdl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="soapEndpoint">Service Endpoint</Label>
                      <Input
                        id="soapEndpoint"
                        value={azurMindConfig.webService.endpoint}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            webService: { ...prev.webService, endpoint: e.target.value }
                          }))
                        }
                        placeholder="http://azurmind.com/services/LabService.asmx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soapNamespace">Namespace</Label>
                      <Input
                        id="soapNamespace"
                        value={azurMindConfig.webService.namespace}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            webService: { ...prev.webService, namespace: e.target.value }
                          }))
                        }
                        placeholder="http://azurmind.com/"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soapAction">SOAP Action</Label>
                    <Input
                      id="soapAction"
                      value={azurMindConfig.webService.soapAction}
                      onChange={(e) =>
                        setAzurMindConfig(prev => ({
                          ...prev,
                          webService: { ...prev.webService, soapAction: e.target.value }
                        }))
                      }
                      placeholder="http://azurmind.com/GetLabData"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wsUsername">Username</Label>
                      <Input
                        id="wsUsername"
                        value={azurMindConfig.webService.username}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            webService: { ...prev.webService, username: e.target.value }
                          }))
                        }
                        placeholder="lab_service"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wsPassword">Password</Label>
                      <Input
                        id="wsPassword"
                        type="password"
                        value={azurMindConfig.webService.password}
                        onChange={(e) =>
                          setAzurMindConfig(prev => ({
                            ...prev,
                            webService: { ...prev.webService, password: e.target.value }
                          }))
                        }
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
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

      {/* SharePoint Configuration */}
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
              checked={sharePointConfig.enabled}
              onCheckedChange={(checked) =>
                setSharePointConfig(prev => ({ ...prev, enabled: checked }))
              }
            />
          </div>
          
          {sharePointConfig.enabled && (
            <>
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="authType">Authentication Method</Label>
                <Select 
                  value={sharePointConfig.authType}
                  onValueChange={(value: any) =>
                    setSharePointConfig(prev => ({ ...prev, authType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Authentication</SelectItem>
                    <SelectItem value="ntlm">Windows NTLM</SelectItem>
                    <SelectItem value="oauth">OAuth 2.0 / App Registration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sharePointSite">SharePoint Site URL</Label>
                <Input
                  id="sharePointSite"
                  value={sharePointConfig.siteUrl}
                  onChange={(e) =>
                    setSharePointConfig(prev => ({ ...prev, siteUrl: e.target.value }))
                  }
                  placeholder="https://yourcompany.sharepoint.com/sites/lab"
                />
              </div>

              {sharePointConfig.authType === 'oauth' ? (
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      value={sharePointConfig.clientId}
                      onChange={(e) =>
                        setSharePointConfig(prev => ({ ...prev, clientId: e.target.value }))
                      }
                      placeholder="App registration client ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientSecret">Client Secret</Label>
                    <Input
                      id="clientSecret"
                      type="password"
                      value={sharePointConfig.clientSecret}
                      onChange={(e) =>
                        setSharePointConfig(prev => ({ ...prev, clientSecret: e.target.value }))
                      }
                      placeholder="App registration secret"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenantId">Tenant ID</Label>
                    <Input
                      id="tenantId"
                      value={sharePointConfig.tenantId}
                      onChange={(e) =>
                        setSharePointConfig(prev => ({ ...prev, tenantId: e.target.value }))
                      }
                      placeholder="Azure AD tenant ID"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sharePointUsername">Username</Label>
                    <Input
                      id="sharePointUsername"
                      value={sharePointConfig.username}
                      onChange={(e) =>
                        setSharePointConfig(prev => ({ ...prev, username: e.target.value }))
                      }
                      placeholder="user@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sharePointPassword">Password</Label>
                    <Input
                      id="sharePointPassword"
                      type="password"
                      value={sharePointConfig.password}
                      onChange={(e) =>
                        setSharePointConfig(prev => ({ ...prev, password: e.target.value }))
                      }
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="sharePointFilePath">Excel File Path</Label>
                <Input
                  id="sharePointFilePath"
                  value={sharePointConfig.filePath}
                  onChange={(e) =>
                    setSharePointConfig(prev => ({ ...prev, filePath: e.target.value }))
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

      {/* Information Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Integration Requirements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Information Required from AzurMind Administrator:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>API Integration:</strong> API endpoint URL, authentication key/token, API version</li>
                <li><strong>Database Access:</strong> Database server address, port, database name, credentials, connection type</li>
                <li><strong>File Transfer:</strong> FTP/SFTP server details, credentials, file paths, data format preferences</li>
                <li><strong>Web Services:</strong> WSDL URL, service endpoints, SOAP actions, authentication details</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">SharePoint Requirements:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Basic Auth:</strong> SharePoint site URL, username, password</li>
                <li><strong>OAuth:</strong> Azure App Registration (Client ID, Secret, Tenant ID)</li>
                <li><strong>File Access:</strong> Excel file path in SharePoint document library</li>
              </ul>
            </div>
          </div>
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