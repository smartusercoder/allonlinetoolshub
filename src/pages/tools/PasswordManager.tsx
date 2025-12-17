import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

interface PasswordEntry {
  id: string;
  site: string;
  username: string;
  password: string;
}

export default function PasswordManager() {
  const [entries, setEntries] = useState<PasswordEntry[]>([]);
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const addEntry = () => {
    if (!site || !password) {
      toast.error("Please fill in at least site and password");
      return;
    }

    const entry: PasswordEntry = {
      id: Date.now().toString(),
      site,
      username,
      password
    };

    setEntries([...entries, entry]);
    setSite("");
    setUsername("");
    setPassword("");
    toast.success("Password saved (stored only in this session)");
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
    toast.success("Entry deleted");
  };

  const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied");
  };

  const toggleShowPassword = (id: string) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ToolLayout
      title="Password Manager"
      description="Securely store passwords in your browser session (not persistent)"
    >
      <div className="space-y-6">
        <Card className="p-6 bg-yellow-500/10 border-yellow-500/30">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            ⚠️ Note: Passwords are stored only in browser memory and will be lost when you close this page. For persistent storage, use a dedicated password manager like Bitwarden or 1Password.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold">Add New Entry</h3>
          
          <div>
            <Label>Website/Service</Label>
            <Input
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="example.com"
            />
          </div>
          
          <div>
            <Label>Username/Email (optional)</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          
          <Button onClick={addEntry} className="w-full">Add Entry</Button>
        </Card>

        {entries.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold">Saved Passwords ({entries.length})</h3>
            {entries.map(entry => (
              <Card key={entry.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{entry.site}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {entry.username && (
                    <div className="text-sm text-muted-foreground">
                      {entry.username}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Input
                      type={showPasswords[entry.id] ? "text" : "password"}
                      value={entry.password}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleShowPassword(entry.id)}
                    >
                      {showPasswords[entry.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyPassword(entry.password)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
