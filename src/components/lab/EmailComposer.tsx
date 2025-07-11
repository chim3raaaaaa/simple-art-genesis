import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Send, Paperclip, Eye, X } from "lucide-react";
import { useState } from "react";

interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
  reportData?: {
    name: string;
    type: string;
    site?: string;
  };
}

interface EmailPreset {
  id: string;
  siteName: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
}

const emailPresets: EmailPreset[] = [
  {
    id: '1',
    siteName: 'Terrarock',
    to: ['manager@terrarock.com', 'qa@terrarock.com'],
    cc: ['lab@ubpmauritius.com'],
    bcc: ['archive@ubpmauritius.com'],
    subject: 'Test Results - Terrarock Site'
  },
  {
    id: '2',
    siteName: 'Drymix',
    to: ['supervisor@drymix.com'],
    cc: ['lab@ubpmauritius.com', 'quality@drymix.com'],
    bcc: ['archive@ubpmauritius.com'],
    subject: 'Test Results - Drymix Plant'
  }
];

export function EmailComposer({ isOpen, onClose, reportData }: EmailComposerProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [emailData, setEmailData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: `Dear Team,

Please find attached the laboratory test results for your review.

Report Details:
- Report Name: ${reportData?.name || 'N/A'}
- Report Type: ${reportData?.type || 'N/A'}
- Generated Date: ${new Date().toLocaleDateString()}

If you have any questions regarding these results, please don't hesitate to contact our laboratory team.

Best regards,
UBP Mauritius Laboratory Team`
  });

  const applyPreset = (presetId: string) => {
    const preset = emailPresets.find(p => p.id === presetId);
    if (preset) {
      setEmailData({
        to: preset.to.join(', '),
        cc: preset.cc.join(', '),
        bcc: preset.bcc.join(', '),
        subject: preset.subject,
        body: emailData.body
      });
    }
  };

  const sendEmail = () => {
    // Integrate with Outlook or email service
    console.log('Sending email:', emailData);
    
    // For Outlook integration, you would use something like:
    // window.open(`mailto:${emailData.to}?cc=${emailData.cc}&bcc=${emailData.bcc}&subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`);
    
    onClose();
  };

  const previewEmail = () => {
    // Open email preview
    console.log('Preview email:', emailData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Compose Email</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preset">Email Preset</Label>
            <Select value={selectedPreset} onValueChange={(value) => {
              setSelectedPreset(value);
              applyPreset(value);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a preset or compose manually" />
              </SelectTrigger>
              <SelectContent>
                {emailPresets.map((preset) => (
                  <SelectItem key={preset.id} value={preset.id}>
                    {preset.siteName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Textarea
              id="to"
              value={emailData.to}
              onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
              placeholder="recipient1@company.com, recipient2@company.com"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cc">CC</Label>
              <Textarea
                id="cc"
                value={emailData.cc}
                onChange={(e) => setEmailData(prev => ({ ...prev, cc: e.target.value }))}
                placeholder="cc@company.com"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcc">BCC</Label>
              <Textarea
                id="bcc"
                value={emailData.bcc}
                onChange={(e) => setEmailData(prev => ({ ...prev, bcc: e.target.value }))}
                placeholder="bcc@company.com"
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Email subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              value={emailData.body}
              onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
              placeholder="Email message"
              rows={10}
            />
          </div>

          {reportData && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Paperclip className="h-4 w-4" />
                <span className="font-medium">Attachments</span>
              </div>
              <Badge variant="outline">
                {reportData.name}.pdf
              </Badge>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button onClick={sendEmail}>
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" onClick={previewEmail}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}