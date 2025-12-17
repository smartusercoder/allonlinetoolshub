import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LicenseGenerator() {
  const [licenseType, setLicenseType] = useState("mit");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [name, setName] = useState("");

  const licenses: Record<string, string> = {
    mit: `MIT License

Copyright (c) ${year} ${name}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    
    apache: `Apache License
Version 2.0, January 2004

Copyright ${year} ${name}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`,

    gpl: `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) ${year} ${name}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.`
  };

  return (
    <ToolLayout
      title="License Generator"
      description="Generate open source licenses"
    >
      <div className="space-y-6">
        <div>
          <Label>License Type</Label>
          <Select value={licenseType} onValueChange={setLicenseType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mit">MIT License</SelectItem>
              <SelectItem value="apache">Apache License 2.0</SelectItem>
              <SelectItem value="gpl">GPL 3.0</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Year</Label>
            <Input
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div>
            <Label>Copyright Holder</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>

        <div>
          <Label>Generated License</Label>
          <Textarea value={licenses[licenseType]} readOnly rows={20} />
        </div>
      </div>
    </ToolLayout>
  );
}
