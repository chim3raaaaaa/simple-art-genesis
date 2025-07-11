import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Plus, Edit, Trash2, Save } from "lucide-react";
import { useState } from "react";

interface EmailPreset {
  id: string;
  siteName: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  isDefault: boolean;
}

export function EmailPresets() {
  const [presets, setPresets] = useState<EmailPreset[]>([
    {
      id: '1',
      siteName: 'Terrarock',
      to: ['manager@terrarock.com', 'qa@terrarock.com'],
      cc: ['lab@ubpmauritius.com'],
      bcc: ['archive@ubpmauritius.com'],
      subject: 'Test Results - Terrarock Site',
      isDefault: false
    },
    {
      id: '2',
      siteName: 'Drymix',
      to: ['supervisor@drymix.com'],
      cc: ['lab@ubpmauritius.com', 'quality@drymix.com'],
      bcc: ['archive@ubpmauritius.com'],
      subject: 'Test Results - Drymix Plant',
      isDefault: true
    }
  ]);

  const [editingPreset, setEditingPreset] = useState<EmailPreset | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const createNewPreset = () => {
    const newPreset: EmailPreset = {
      id: Date.now().toString(),
      siteName: '',
      to: [],
      cc: [],
      bcc: [],
      subject: '',
      isDefault: false
    };
    setEditingPreset(newPreset);
    setIsCreating(true);
  };

  const savePreset = () => {
    if (!editingPreset) return;

    if (isCreating) {
      setPresets(prev => [...prev, editingPreset]);
    } else {
      setPresets(prev => prev.map(p => p.id === editingPreset.id ? editingPreset : p));
    }

    setEditingPreset(null);
    setIsCreating(false);
  };

  const deletePreset = (id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  };

  const setAsDefault = (id: string) => {
    setPresets(prev => prev.map(p => ({ ...p, isDefault: p.id === id })));
  };

  const parseEmailList = (emailString: string): string[] => {
    return emailString.split(',').map(email => email.trim()).filter(email => email);
  };

  const formatEmailList = (emails: string[]): string => {
    return emails.join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Email Presets</h3>
          <p className="text-sm text-muted-foreground">
            Configure email recipients for each site/plant
          </p>
        </div>
        <Button onClick={createNewPreset}>
          <Plus className="h-4 w-4 mr-2" />
          Add Preset
        </Button>
      </div>

      {editingPreset && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>{isCreating ? 'Create New Preset' : 'Edit Preset'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site/Plant Name</Label>
              <Input
                id="siteName"
                value={editingPreset.siteName}
                onChange={(e) =>
                  setEditingPreset(prev => prev ? { ...prev, siteName: e.target.value } : null)
                }
                placeholder="e.g., Terrarock, Drymix"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Default Subject</Label>
              <Input
                id="subject"
                value={editingPreset.subject}
                onChange={(e) =>
                  setEditingPreset(prev => prev ? { ...prev, subject: e.target.value } : null)
                }
                placeholder="Test Results - {Site Name}"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toEmails">To (Recipients)</Label>
              <Textarea
                id="toEmails"
                value={formatEmailList(editingPreset.to)}
                onChange={(e) =>
                  setEditingPreset(prev => prev ? { ...prev, to: parseEmailList(e.target.value) } : null)
                }
                placeholder="email1@company.com, email2@company.com"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ccEmails">CC (Carbon Copy)</Label>
              <Textarea
                id="ccEmails"
                value={formatEmailList(editingPreset.cc)}
                onChange={(e) =>
                  setEditingPreset(prev => prev ? { ...prev, cc: parseEmailList(e.target.value) } : null)
                }
                placeholder="cc1@company.com, cc2@company.com"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bccEmails">BCC (Blind Carbon Copy)</Label>
              <Textarea
                id="bccEmails"
                value={formatEmailList(editingPreset.bcc)}
                onChange={(e) =>
                  setEditingPreset(prev => prev ? { ...prev, bcc: parseEmailList(e.target.value) } : null)
                }
                placeholder="archive@company.com"
                rows={2}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={savePreset}>
                <Save className="h-4 w-4 mr-2" />
                Save Preset
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingPreset(null);
                  setIsCreating(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {presets.map((preset) => (
          <Card key={preset.id} className={preset.isDefault ? 'border-primary/50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{preset.siteName}</h4>
                  {preset.isDefault && (
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  {!preset.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAsDefault(preset.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPreset(preset);
                      setIsCreating(false);
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePreset(preset.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Subject:</span> {preset.subject}
                </div>
                <div>
                  <span className="font-medium">To:</span> {formatEmailList(preset.to)}
                </div>
                {preset.cc.length > 0 && (
                  <div>
                    <span className="font-medium">CC:</span> {formatEmailList(preset.cc)}
                  </div>
                )}
                {preset.bcc.length > 0 && (
                  <div>
                    <span className="font-medium">BCC:</span> {formatEmailList(preset.bcc)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}