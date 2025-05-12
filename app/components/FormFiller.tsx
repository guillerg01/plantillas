"use client";

import { useState } from "react";
import { FormTemplate, FormField } from "../types/form";
import Select from "react-select";

interface FormFillerProps {
  template: FormTemplate;
  onSubmit: (data: Record<string, any>) => void;
}

export default function FormFiller({ template, onSubmit }: FormFillerProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (field: FormField, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: "42px",
      borderRadius: "0.375rem",
      borderColor: "#e5e7eb",
      "&:hover": {
        borderColor: "#3b82f6",
      },
      boxShadow: "none",
      "&:focus-within": {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)",
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#eff6ff"
        : "white",
      color: state.isSelected ? "white" : "#1f2937",
      "&:hover": {
        backgroundColor: state.isSelected ? "#2563eb" : "#eff6ff",
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#eff6ff",
      borderRadius: "0.25rem",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: "#1f2937",
      padding: "0.25rem 0.5rem",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "#6b7280",
      "&:hover": {
        backgroundColor: "#dbeafe",
        color: "#1f2937",
      },
    }),
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        );
      case "select":
        return (
          <Select
            value={
              field.options?.find((opt) =>
                typeof opt === "string"
                  ? opt === formData[field.name]
                  : opt.value === formData[field.name]
              )
                ? {
                    value: formData[field.name] || "",
                    label: formData[field.name] || "",
                  }
                : null
            }
            onChange={(option: { value: string; label: string } | null) =>
              handleInputChange(field, option?.value || "")
            }
            options={field.options?.map((opt) =>
              typeof opt === "string"
                ? { value: opt, label: opt }
                : { value: opt.value, label: opt.label }
            )}
            placeholder="Select an option"
            isClearable
            styles={customSelectStyles}
            className="w-full"
          />
        );
      case "multiselect":
        return (
          <Select
            value={field.options
              ?.filter((opt) => formData[field.name]?.includes(opt))
              .map((opt) => ({ value: opt, label: opt }))}
            onChange={(options) =>
              handleInputChange(field, options?.map((opt) => opt.value) || [])
            }
            options={field.options?.map((opt) => ({ value: opt, label: opt }))}
            isMulti
            placeholder="Select multiple options"
            styles={customSelectStyles}
            className="w-full"
          />
        );
      case "checkbox":
        return (
          <div className="space-y-3">
            {Array.isArray(field.options) && field.options.length > 0 ? (
              field.options.map((option, index) => {
                const checkboxOption =
                  typeof option === "string"
                    ? { label: option, value: option }
                    : option;

                return (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      id={`${field.name}-${index}`}
                      checked={
                        Array.isArray(formData[field.name])
                          ? formData[field.name].includes(checkboxOption.value)
                          : false
                      }
                      onChange={(e) => {
                        const currentValues = Array.isArray(
                          formData[field.name]
                        )
                          ? formData[field.name]
                          : [];

                        const newValues = e.target.checked
                          ? [...currentValues, checkboxOption.value]
                          : currentValues.filter(
                              (v: string) => v !== checkboxOption.value
                            );

                        handleInputChange(field, newValues);
                      }}
                      disabled={checkboxOption.disabled}
                      className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                    />
                    <div className="flex flex-col">
                      <label
                        htmlFor={`${field.name}-${index}`}
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        {checkboxOption.label}
                      </label>
                      {checkboxOption.description && (
                        <span className="text-sm text-gray-500 mt-1">
                          {checkboxOption.description}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={formData[field.name] || false}
                  onChange={(e) => handleInputChange(field, e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                />
              </div>
            )}
          </div>
        );
      case "radio":
        return (
          <div className="space-y-3">
            {field.options?.map((option, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <input
                  type="radio"
                  name={field.name}
                  value={typeof option === "string" ? option : option.value}
                  checked={
                    formData[field.name] ===
                    (typeof option === "string" ? option : option.value)
                  }
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 transition-colors duration-200"
                />
                <label className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                  {typeof option === "string" ? option : option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case "image":
        return (
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleInputChange(field, reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">{template.name}</h2>
      {template.description && (
        <p className="text-gray-600 mb-6">{template.description}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        {template.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.validation?.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            {renderField(field)}
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
