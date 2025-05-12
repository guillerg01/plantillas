"use client";

import { useState } from "react";
import { FormTemplate, FormSubmission } from "../types/form";
import FormBuilder from "../components/FormBuilder";
import TemplateList from "../components/TemplateList";
import FormFiller from "../components/FormFiller";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  console.log(templates);
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleSaveTemplate = (template: FormTemplate) => {
    if (isEditing) {
      setTemplates(templates.map((t) => (t.id === template.id ? template : t)));
    } else {
      setTemplates([...templates, template]);
    }
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleEditTemplate = (template: FormTemplate) => {
    setSelectedTemplate(template);
    setIsEditing(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((t) => t.id !== templateId));
  };

  const handleUseTemplate = (template: FormTemplate) => {
    setSelectedTemplate(template);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    // Here you would typically save the form submission to your backend
    console.log("Form submitted:", data);
    // Reset the form view
    setSelectedTemplate(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Form Templates</h1>
        <button
          onClick={() => {
            setIsCreating(true);
            setSelectedTemplate(null);
            setIsEditing(false);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New Template
        </button>
      </div>

      {isCreating && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Create New Template</h2>
          <FormBuilder onSave={handleSaveTemplate} />
        </div>
      )}

      {isEditing && selectedTemplate && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Edit Template</h2>
          <FormBuilder
            onSave={handleSaveTemplate}
            initialTemplate={selectedTemplate}
          />
        </div>
      )}

      {selectedTemplate && !isEditing && !isCreating && (
        <div className="mb-8">
          <button
            onClick={() => setSelectedTemplate(null)}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Templates
          </button>
          <FormFiller template={selectedTemplate} onSubmit={handleFormSubmit} />
        </div>
      )}

      {!selectedTemplate && !isCreating && !isEditing && (
        <TemplateList
          templates={templates}
          onEdit={handleEditTemplate}
          onDelete={handleDeleteTemplate}
          onUse={handleUseTemplate}
        />
      )}
    </div>
  );
}
