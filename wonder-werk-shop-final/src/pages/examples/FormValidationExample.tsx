import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedInput, ValidatedTextarea, ValidatedFileUpload } from "@/components/form";
import { useFormValidation } from "@/hooks/useFormValidation";
import {
  validateText,
  validateEmail,
  validateUrl,
  validateImageFile,
  ValidationResult,
} from "@/utils/validation";
import { toast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  website: string;
  message: string;
  file: File | null;
}

export default function FormValidationExample() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");

  const { values, errors, touched, handleChange, handleBlur, validateAllFields } =
    useFormValidation<FormData>(
      {
        name: "",
        email: "",
        website: "",
        message: "",
        file: null,
      },
      {
        name: (value: string): ValidationResult =>
          validateText(value, { required: true, minLength: 2, maxLength: 50 }),
        email: (value: string): ValidationResult => {
          const textResult = validateText(value, { required: true });
          if (!textResult.isValid) return textResult;
          return validateEmail(value);
        },
        website: (value: string): ValidationResult => {
          if (!value) return { isValid: true }; // Optional field
          return validateUrl(value);
        },
        message: (value: string): ValidationResult =>
          validateText(value, { required: true, minLength: 10, maxLength: 500 }),
      }
    );

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    setFileError("");

    if (selectedFile) {
      const validation = validateImageFile(selectedFile);
      if (!validation.isValid) {
        setFileError(validation.error || "Invalid file");
        setFile(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateAllFields();

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Form Submitted Successfully!",
      description: "All validation passed.",
    });

    // Form submitted successfully - data would be sent to server here
  };

  return (
    <ToolLayout
      title="Form Validation Example"
      description="Demonstration of validated form components"
    >
      <Card>
        <CardHeader>
          <CardTitle>Contact Form with Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ValidatedInput
              label="Name"
              placeholder="Enter your name"
              value={values.name}
              onChange={(value) => handleChange("name", value)}
              onBlur={() => handleBlur("name")}
              error={touched.name ? errors.name : undefined}
              required
              helperText="Your full name (2-50 characters)"
            />

            <ValidatedInput
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              value={values.email}
              onChange={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={touched.email ? errors.email : undefined}
              required
              helperText="We'll never share your email"
            />

            <ValidatedInput
              label="Website"
              type="url"
              placeholder="https://example.com"
              value={values.website}
              onChange={(value) => handleChange("website", value)}
              onBlur={() => handleBlur("website")}
              error={touched.website ? errors.website : undefined}
              helperText="Optional: Your website URL"
            />

            <ValidatedTextarea
              label="Message"
              placeholder="Enter your message..."
              rows={5}
              value={values.message}
              onChange={(value) => handleChange("message", value)}
              onBlur={() => handleBlur("message")}
              error={touched.message ? errors.message : undefined}
              required
              showCharCount
              maxLength={500}
              helperText="Tell us what you think (10-500 characters)"
            />

            <ValidatedFileUpload
              label="Profile Picture"
              accept="image/*"
              onFileSelect={handleFileSelect}
              error={fileError}
              value={file}
              helperText="Upload a profile picture (max 10MB, images only)"
              maxSize={10 * 1024 * 1024}
            />

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Submit Form
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
