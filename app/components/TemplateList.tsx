"use client";

import { FormTemplate } from "../types/form";

interface TemplateListProps {
  templates: FormTemplate[];
  onEdit: (template: FormTemplate) => void;
  onDelete: (templateId: string) => void;
  onUse: (template: FormTemplate) => void;
}

export default function TemplateList({
  templates,
  onEdit,
  onDelete,
  onUse,
}: TemplateListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Form Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{template.name}</h3>
                {template.description && (
                  <p className="text-gray-600 text-sm">
                    {template.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(template)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(template.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p>Fields: {template.fields.length}</p>
              <p>
                Last updated:{" "}
                {new Date(template.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onUse(template)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
