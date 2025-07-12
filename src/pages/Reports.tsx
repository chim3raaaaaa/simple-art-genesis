import { LabLayout } from "@/components/lab/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Download, FileText, Calendar, Eye, Share, Printer, Edit, Trash2, Settings } from "lucide-react";
import { EmailComposer } from "@/components/lab/EmailComposer";
import { useState } from "react";

const reports = [
  {
    id: "RPT-2024-001",
    memoId: "MEMO-2024-001",
    name: "Monthly Test Summary",
    type: "Summary",
    generatedBy: "Dr. Sarah Johnson",
    dateGenerated: "2024-01-15",
    status: "Published",
    format: "PDF",
    size: "2.4 MB"
  },
  {
    id: "RPT-2024-002",
    memoId: "MEMO-2024-002",
    name: "Aggregate Quality Report",
    type: "Quality",
    generatedBy: "John Smith",
    dateGenerated: "2024-01-14",
    status: "Draft",
    format: "PDF",
    size: "1.8 MB"
  },
  {
    id: "RPT-2024-003",
    memoId: "MEMO-2024-003",
    name: "Batch Analysis Report",
    type: "Analysis",
    generatedBy: "Mike Davis",
    dateGenerated: "2024-01-12",
    status: "Published",
    format: "Excel",
    size: "856 KB"
  }
];

const memos = [
  {
    id: "MEMO-2024-001",
    title: "Monthly Test Summary",
    status: "Completed",
    uploadDate: "2024-01-15",
    type: "Summary Report",
    size: "2.4 MB"
  },
  {
    id: "MEMO-2024-002", 
    title: "Aggregate Quality Report",
    status: "In Process",
    uploadDate: "2024-01-14",
    type: "Quality Report",
    size: "1.8 MB"
  },
  {
    id: "MEMO-2024-003",
    title: "Batch Analysis Report", 
    status: "Pending",
    uploadDate: "2024-01-12",
    type: "Analysis Report",
    size: "856 KB"
  },
  {
    id: "MEMO-2024-004",
    title: "Site Inspection Report",
    status: "Completed",
    uploadDate: "2024-01-10",
    type: "Inspection Report",
    size: "1.2 MB"
  }
];

const templates = [
  { id: "TPL-001", name: "Test Certificate", description: "Individual test result certificate", category: "Certificate", isDefault: true },
  { id: "TPL-002", name: "Batch Summary", description: "Summary of all tests in a batch", category: "Summary", isDefault: false },
  { id: "TPL-003", name: "Quality Control Report", description: "QC analysis and recommendations", category: "Quality", isDefault: false },
  { id: "TPL-004", name: "Monthly Analytics", description: "Monthly performance and statistics", category: "Analytics", isDefault: true },
  { id: "TPL-005", name: "Compliance Report", description: "Regulatory compliance summary", category: "Compliance", isDefault: false },
  { id: "TPL-006", name: "Site Inspection Report", description: "On-site inspection and testing results", category: "Inspection", isDefault: false },
  { id: "TPL-007", name: "Material Certification", description: "Material compliance certification", category: "Certification", isDefault: false },
  { id: "TPL-008", name: "Aggregate Analysis", description: "Comprehensive aggregate testing report", category: "Analysis", isDefault: true }
];

const certificateTemplates = [
  { id: "CERT-TPL-001", name: "Aggregate Compliance Template", description: "Template for aggregate compliance certificates", category: "Compliance", isDefault: true },
  { id: "CERT-TPL-002", name: "Concrete Block Template", description: "Template for concrete block certificates", category: "Construction", isDefault: false },
  { id: "CERT-TPL-003", name: "Paving Stone Template", description: "Template for paving stone certificates", category: "Infrastructure", isDefault: false },
  { id: "CERT-TPL-004", name: "General Material Template", description: "Generic material certification template", category: "General", isDefault: false }
];

const certificates = [
  {
    id: "CERT-2024-001",
    name: "Aggregate Compliance Certificate",
    standard: "BS EN 12620",
    issuedTo: "ABC Construction Ltd",
    dateIssued: "2024-01-15",
    validUntil: "2024-07-15",
    status: "Valid",
    batchRef: "BC-3201"
  },
  {
    id: "CERT-2024-002", 
    name: "Concrete Block Certificate",
    standard: "BS EN 771-3",
    issuedTo: "DEF Builders",
    dateIssued: "2024-01-12",
    validUntil: "2024-07-12",
    status: "Valid",
    batchRef: "BC-3203"
  },
  {
    id: "CERT-2024-003",
    name: "Paving Stone Certificate",
    standard: "BS EN 1338",
    issuedTo: "GHI Infrastructure",
    dateIssued: "2024-01-10",
    validUntil: "2024-07-10", 
    status: "Expired",
    batchRef: "BC-3205"
  }
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("reports");
  const [emailComposer, setEmailComposer] = useState({
    isOpen: false,
    reportData: null as any
  });

  const handlePrint = () => {
    window.print();
  };

  const handleAddTemplate = () => {
    console.log("Add new template");
  };

  const handleGenerateCertificate = () => {
    console.log("Generate new certificate");
  };

  const handleEditTemplate = (templateId: string) => {
    console.log("Edit template:", templateId);
  };

  const handleDeleteTemplate = (templateId: string) => {
    console.log("Delete template:", templateId);
  };

  const handleSetDefault = (templateId: string) => {
    console.log("Set as default template:", templateId);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'summary': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'quality': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
      case 'analysis': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const openEmailComposer = (report: any) => {
    setEmailComposer({
      isOpen: true,
      reportData: report
    });
  };

  const closeEmailComposer = () => {
    setEmailComposer({
      isOpen: false,
      reportData: null
    });
  };

  return (
    <LabLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Generate Reports</h1>
            <p className="text-muted-foreground">
              Generate and manage laboratory reports and compliance certificates
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            {activeTab === "certificates" && (
              <Button onClick={handleGenerateCertificate}>
                <Plus className="h-4 w-4 mr-2" />
                Generate Certificate
              </Button>
            )}
            {activeTab === "templates" && (
              <Button onClick={handleAddTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            )}
          </div>
        </div>

        {activeTab === "reports" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Card className="h-20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
                <CardTitle className="text-xs font-medium">Total Reports</CardTitle>
                <FileText className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold">{reports.length}</div>
              </CardContent>
            </Card>
            
            <Card className="h-20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
                <CardTitle className="text-xs font-medium">Published</CardTitle>
                <Eye className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold">
                  {reports.filter(r => r.status === "Published").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="h-20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
                <CardTitle className="text-xs font-medium">Drafts</CardTitle>
                <Calendar className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold">
                  {reports.filter(r => r.status === "Draft").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="h-20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
                <CardTitle className="text-xs font-medium">This Month</CardTitle>
                <Share className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold">12</div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            <Button 
              variant={activeTab === "reports" ? "default" : "outline"}
              onClick={() => setActiveTab("reports")}
            >
              Reports
            </Button>
            <Button 
              variant={activeTab === "certificates" ? "default" : "outline"}
              onClick={() => setActiveTab("certificates")}
            >
              Compliance Certificates
            </Button>
            <Button 
              variant={activeTab === "templates" ? "default" : "outline"}
              onClick={() => setActiveTab("templates")}
            >
              Templates
            </Button>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {activeTab === "reports" && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {activeTab === "reports" ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Memo Overview</CardTitle>
                <p className="text-sm text-muted-foreground">All uploaded memos with their current status</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {memos.map((memo) => (
                    <div key={memo.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{memo.title}</h4>
                          <p className="text-sm text-muted-foreground">Memo ID: {memo.id}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={memo.status === "Completed" ? "bg-green-500/20 text-green-700" : 
                                             memo.status === "In Process" ? "bg-yellow-500/20 text-yellow-700" : 
                                             "bg-gray-500/20 text-gray-700"}>
                              {memo.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">• {memo.uploadDate} • {memo.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Memo ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.memoId}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(report.type)}>
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.generatedBy}</TableCell>
                        <TableCell>{report.dateGenerated}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.format}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEmailComposer(report)}
                            >
                              <Share className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : activeTab === "certificates" ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Templates</CardTitle>
                <p className="text-sm text-muted-foreground">Manage compliance certificate templates</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {certificateTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{template.name}</h4>
                          {template.isDefault && (
                            <Badge variant="secondary" className="text-xs">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template.id)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        {!template.isDefault && (
                          <Button variant="outline" size="sm" onClick={() => handleSetDefault(template.id)}>
                            <Settings className="h-3 w-3 mr-1" />
                            Set Default
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Standard</TableHead>
                      <TableHead>Issued To</TableHead>
                      <TableHead>Date Issued</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Batch Ref</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certificates.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-medium">{cert.id}</TableCell>
                        <TableCell>{cert.name}</TableCell>
                        <TableCell>{cert.standard}</TableCell>
                        <TableCell>{cert.issuedTo}</TableCell>
                        <TableCell>{cert.dateIssued}</TableCell>
                        <TableCell>{cert.validUntil}</TableCell>
                        <TableCell>
                          <Badge className={cert.status === "Valid" ? "bg-green-500/20 text-green-700 border-green-500/30" : "bg-red-500/20 text-red-700 border-red-500/30"}>
                            {cert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{cert.batchRef}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <p className="text-sm text-muted-foreground">Manage and organize report templates</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{template.name}</h4>
                        {template.isDefault && (
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template.id)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      {!template.isDefault && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(template.id)}>
                          <Settings className="h-3 w-3 mr-1" />
                          Set Default
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <EmailComposer
          isOpen={emailComposer.isOpen}
          onClose={closeEmailComposer}
          reportData={emailComposer.reportData}
        />
      </div>
    </LabLayout>
  );
}