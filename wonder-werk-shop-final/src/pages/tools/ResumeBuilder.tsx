import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, Plus, Trash2 } from "lucide-react";

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export default function ResumeBuilder() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([
    { company: "", position: "", startDate: "", endDate: "", description: "" }
  ]);
  const [education, setEducation] = useState<Education[]>([
    { school: "", degree: "", field: "", graduationDate: "" }
  ]);
  const { toast } = useToast();

  const addExperience = () => {
    setExperiences([...experiences, { company: "", position: "", startDate: "", endDate: "", description: "" }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addEducation = () => {
    setEducation([...education, { school: "", degree: "", field: "", graduationDate: "" }]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const generatePDF = () => {
    const resumeContent = `
${fullName.toUpperCase()}
${"=".repeat(fullName.length)}

Contact: ${email} | ${phone} | ${location}

SUMMARY
${summary}

SKILLS
${skills}

EXPERIENCE
${experiences.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.endDate}
${exp.description}
`).join("\n")}

EDUCATION
${education.map(edu => `
${edu.degree} in ${edu.field}
${edu.school} - ${edu.graduationDate}
`).join("\n")}
    `.trim();

    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, "_")}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({ title: "Success", description: "Resume downloaded as text file" });
  };

  return (
    <ToolLayout title="Resume Builder" description="Create a professional resume">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="New York, NY" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Professional Summary</Label>
              <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Brief summary of your professional background..." />
            </div>
            <div className="space-y-2">
              <Label>Skills (comma separated)</Label>
              <Input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="JavaScript, React, Node.js, Python" />
            </div>
          </Card>

          <Tabs defaultValue="experience">
            <TabsList className="w-full">
              <TabsTrigger value="experience" className="flex-1">Experience</TabsTrigger>
              <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="experience">
              <Card className="p-6 space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="space-y-3 pb-4 border-b last:border-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Experience {index + 1}</span>
                      {experiences.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} />
                      <Input placeholder="Position" value={exp.position} onChange={(e) => updateExperience(index, "position", e.target.value)} />
                      <Input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} />
                      <Input placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} />
                    </div>
                    <Textarea placeholder="Job description..." value={exp.description} onChange={(e) => updateExperience(index, "description", e.target.value)} />
                  </div>
                ))}
                <Button variant="outline" onClick={addExperience}>
                  <Plus className="h-4 w-4 mr-2" />Add Experience
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="p-6 space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-3 pb-4 border-b last:border-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Education {index + 1}</span>
                      {education.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input placeholder="School" value={edu.school} onChange={(e) => updateEducation(index, "school", e.target.value)} />
                      <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} />
                      <Input placeholder="Field of Study" value={edu.field} onChange={(e) => updateEducation(index, "field", e.target.value)} />
                      <Input placeholder="Graduation Date" value={edu.graduationDate} onChange={(e) => updateEducation(index, "graduationDate", e.target.value)} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addEducation}>
                  <Plus className="h-4 w-4 mr-2" />Add Education
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Preview</h3>
            <Button onClick={generatePDF}>
              <Download className="h-4 w-4 mr-2" />Download
            </Button>
          </div>
          <div className="bg-white text-black p-8 min-h-[600px] rounded border font-serif">
            <h1 className="text-2xl font-bold text-center mb-2">{fullName || "Your Name"}</h1>
            <p className="text-center text-sm text-gray-600 mb-4">
              {[email, phone, location].filter(Boolean).join(" | ") || "Contact Information"}
            </p>
            
            {summary && (
              <div className="mb-4">
                <h2 className="text-lg font-bold border-b border-black mb-2">Summary</h2>
                <p className="text-sm">{summary}</p>
              </div>
            )}
            
            {skills && (
              <div className="mb-4">
                <h2 className="text-lg font-bold border-b border-black mb-2">Skills</h2>
                <p className="text-sm">{skills}</p>
              </div>
            )}
            
            {experiences.some(e => e.company || e.position) && (
              <div className="mb-4">
                <h2 className="text-lg font-bold border-b border-black mb-2">Experience</h2>
                {experiences.filter(e => e.company || e.position).map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <strong className="text-sm">{exp.position}</strong>
                      <span className="text-xs">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-sm italic">{exp.company}</div>
                    <p className="text-xs mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {education.some(e => e.school || e.degree) && (
              <div>
                <h2 className="text-lg font-bold border-b border-black mb-2">Education</h2>
                {education.filter(e => e.school || e.degree).map((edu, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between">
                      <strong className="text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</strong>
                      <span className="text-xs">{edu.graduationDate}</span>
                    </div>
                    <div className="text-sm">{edu.school}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
