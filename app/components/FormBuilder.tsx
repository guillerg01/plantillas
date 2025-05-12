"use client";

import { useState } from "react";
import {
  FormField,
  FormTemplate,
  FieldType,
  CheckboxOptions,
} from "../types/form";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

interface FormBuilderProps {
  onSave: (template: FormTemplate) => void;
  initialTemplate?: FormTemplate;
}

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customValidation?: string;
}

interface FieldCustomization {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  customClass?: string;
}

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string | string[] | boolean;
  options?: string[] | CheckboxOptions[];
  validation?: ValidationRules;
  customization?: FieldCustomization;
  dataType?: "text" | "number" | "email" | "date" | "tel" | "url";
  description?: string;
  helpText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

export default function FormBuilder({
  onSave,
  initialTemplate,
}: FormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>(
    initialTemplate?.fields || []
  );
  const [templateName, setTemplateName] = useState(initialTemplate?.name || "");
  const [templateDescription, setTemplateDescription] = useState(
    initialTemplate?.description || ""
  );

  const [selectedField, setSelectedField] = useState<string | null>(null);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: uuidv4(),
      type,
      label: `New ${type} field`,
      name: `field_${fields.length + 1}`,
      placeholder: `Enter ${type}...`,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSave = () => {
    const template: FormTemplate = {
      id: initialTemplate?.id || uuidv4(),
      name: templateName,
      description: templateDescription,
      fields,
      createdAt: initialTemplate?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    onSave(template);
  };

  const customSelectStyles = {
    control: (styles: any) => ({
      ...styles,
      borderColor: "#d2d6dc",
      "&:hover": {
        borderColor: "#a0aec0",
      },
    }),
    option: (styles: any) => ({
      ...styles,
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#f3f4f6",
      },
    }),
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: "#fff",
    }),
  };

  const getFieldCustomization = (field: FormField) => {
    return {
      color: field.customization?.color || "text-gray-700",
      backgroundColor: field.customization?.backgroundColor || "bg-white",
      borderColor: field.customization?.borderColor || "border-blue-100",
      fontSize: field.customization?.fontSize || "text-base",
      fontWeight: field.customization?.fontWeight || "font-normal",
    };
  };

  const renderFieldValidation = (field: FormField) => {
    const renderTypeSpecificValidations = () => {
      switch (field.type) {
        case "text":
          return (
            <div className="space-y-4">
              <div className="p-3 bg-white rounded-lg border border-blue-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato del Texto
                </label>
                <select
                  value={field.validation?.pattern || ""}
                  onChange={(e) =>
                    updateField(field.id, {
                      validation: {
                        ...field.validation,
                        pattern: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Cualquier texto</option>
                  <option value="[A-Za-z]+">Solo letras</option>
                  <option value="[0-9]+">Solo números</option>
                  <option value="[A-Za-z0-9]+">Letras y números</option>
                  <option value="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}">
                    Email
                  </option>
                  <option value="[0-9]{9}">Teléfono (9 dígitos)</option>
                  <option value="https?://.+">URL</option>
                </select>
              </div>

              <div className="p-3 bg-white rounded-lg border border-blue-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitud del Texto
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Mínimo de caracteres
                    </label>
                    <input
                      type="number"
                      value={field.validation?.minLength || ""}
                      onChange={(e) =>
                        updateField(field.id, {
                          validation: {
                            ...field.validation,
                            minLength: parseInt(e.target.value),
                          },
                        })
                      }
                      placeholder="Ej: 3"
                      className="w-full p-2 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Máximo de caracteres
                    </label>
                    <input
                      type="number"
                      value={field.validation?.maxLength || ""}
                      onChange={(e) =>
                        updateField(field.id, {
                          validation: {
                            ...field.validation,
                            maxLength: parseInt(e.target.value),
                          },
                        })
                      }
                      placeholder="Ej: 50"
                      className="w-full p-2 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          );

        case "select":
        case "multiselect":
          return (
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selección Múltiple
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={field.type === "multiselect"}
                  onChange={(e) =>
                    updateField(field.id, {
                      type: e.target.checked ? "multiselect" : "select",
                    })
                  }
                  className="w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 rounded-lg"
                />
                <span className="text-gray-700">
                  Permitir selección múltiple
                </span>
              </div>
            </div>
          );

        case "checkbox":
        case "radio":
          return (
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opciones por Defecto
              </label>
              <div className="space-y-2">
                {Array.isArray(field.options) &&
                  field.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type={field.type === "checkbox" ? "checkbox" : "radio"}
                        checked={
                          typeof option === "string" ? false : option.checked
                        }
                        onChange={(e) => {
                          const newOptions = [...(field.options || [])];
                          if (typeof option === "string") {
                            newOptions[index] = {
                              label: option,
                              checked: e.target.checked,
                            };
                          } else {
                            newOptions[index] = {
                              ...option,
                              checked: e.target.checked,
                            };
                          }
                          updateField(field.id, { options: newOptions });
                        }}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 rounded-lg"
                      />
                      <span className="text-gray-700">
                        {typeof option === "string" ? option : option.label}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          );

        case "image":
          return (
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restricciones de Imagen
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Tamaño máximo (MB)
                  </label>
                  <input
                    type="number"
                    value={field.validation?.max || ""}
                    onChange={(e) =>
                      updateField(field.id, {
                        validation: {
                          ...field.validation,
                          max: parseInt(e.target.value),
                        },
                      })
                    }
                    placeholder="Ej: 5"
                    className="w-full p-2 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Formatos permitidos
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["jpg", "png", "gif"].map((format) => (
                      <label
                        key={format}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={field.validation?.allowedFormats?.includes(
                            format
                          )}
                          onChange={(e) => {
                            const formats =
                              field.validation?.allowedFormats || [];
                            const newFormats = e.target.checked
                              ? [...formats, format]
                              : formats.filter((f) => f !== format);
                            updateField(field.id, {
                              validation: {
                                ...field.validation,
                                allowedFormats: newFormats,
                              },
                            });
                          }}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-400 border-blue-300 rounded"
                        />
                        <span className="text-gray-700">
                          {format.toUpperCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="space-y-4 mt-4 p-6 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Validaciones</h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Mostrar Ayuda</span>
            <button
              type="button"
              className="p-1 text-blue-500 hover:text-blue-600 focus:outline-none"
              onClick={() => {
                alert(
                  "Las validaciones te ayudan a controlar cómo los usuarios pueden interactuar con este campo. Por ejemplo, puedes hacer que un campo sea obligatorio o establecer un formato específico para emails."
                );
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Validaciones Básicas */}
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors duration-200">
            <input
              type="checkbox"
              checked={field.isRequired}
              onChange={(e) =>
                updateField(field.id, { isRequired: e.target.checked })
              }
              className="w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 rounded-lg"
            />
            <div>
              <span className="text-gray-700 font-medium">
                Campo Obligatorio
              </span>
              <p className="text-sm text-gray-500">
                El usuario debe completar este campo
              </p>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors duration-200">
            <input
              type="checkbox"
              checked={field.isDisabled}
              onChange={(e) =>
                updateField(field.id, { isDisabled: e.target.checked })
              }
              className="w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 rounded-lg"
            />
            <div>
              <span className="text-gray-700 font-medium">
                Campo Deshabilitado
              </span>
              <p className="text-sm text-gray-500">
                El usuario no podrá modificar este campo
              </p>
            </div>
          </label>
        </div>

        {/* Validaciones Específicas por Tipo */}
        {renderTypeSpecificValidations()}

        {/* Mensaje de Error Personalizado */}
        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje de Error
          </label>
          <input
            type="text"
            value={field.validation?.customValidation || ""}
            onChange={(e) =>
              updateField(field.id, {
                validation: {
                  ...field.validation,
                  customValidation: e.target.value,
                },
              })
            }
            placeholder="Ej: Por favor, ingresa un email válido"
            className="w-full p-2 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <p className="mt-1 text-xs text-gray-500">
            Este mensaje se mostrará cuando el usuario ingrese datos incorrectos
          </p>
        </div>
      </div>
    );
  };

  const renderFieldCustomization = (field: FormField) => (
    <div className="space-y-4 mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
      <h4 className="text-lg font-semibold text-gray-700">Personalización</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color de Texto
          </label>
          <input
            type="color"
            value={field.customization?.color || "#374151"}
            onChange={(e) =>
              updateField(field.id, {
                customization: {
                  ...field.customization,
                  color: e.target.value,
                },
              })
            }
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color de Fondo
          </label>
          <input
            type="color"
            value={field.customization?.backgroundColor || "#ffffff"}
            onChange={(e) =>
              updateField(field.id, {
                customization: {
                  ...field.customization,
                  backgroundColor: e.target.value,
                },
              })
            }
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color de Borde
          </label>
          <input
            type="color"
            value={field.customization?.borderColor || "#93c5fd"}
            onChange={(e) =>
              updateField(field.id, {
                customization: {
                  ...field.customization,
                  borderColor: e.target.value,
                },
              })
            }
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tamaño de Fuente
          </label>
          <select
            value={field.customization?.fontSize || "text-base"}
            onChange={(e) =>
              updateField(field.id, {
                customization: {
                  ...field.customization,
                  fontSize: e.target.value,
                },
              })
            }
            className="w-full p-2 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="text-xs">Muy Pequeño</option>
            <option value="text-sm">Pequeño</option>
            <option value="text-base">Normal</option>
            <option value="text-lg">Grande</option>
            <option value="text-xl">Muy Grande</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Form Builder Panel */}
      <div className="w-1/2 space-y-6">
        <div className="bg-white rounded-xl shadow-xl p-8 space-y-4 border border-blue-100">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Nombre de la Plantilla"
            className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
          />
          <textarea
            value={templateDescription}
            onChange={(e) => setTemplateDescription(e.target.value)}
            placeholder="Descripción de la Plantilla"
            className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
            rows={3}
          />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Agregar Campos
          </h3>
          <div className="flex flex-wrap gap-3">
            {(
              [
                "text",
                "select",
                "multiselect",
                "checkbox",
                "radio",
                "image",
              ] as FieldType[]
            ).map((type) => (
              <button
                key={type}
                onClick={() => addField(type)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Agregar {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {fields.map((field) => (
            <div
              key={field.id}
              className="bg-white rounded-xl shadow-xl p-8 space-y-6 border border-blue-100"
            >
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    updateField(field.id, { label: e.target.value })
                  }
                  placeholder="Etiqueta del Campo"
                  className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
                />
                <button
                  onClick={() => removeField(field.id)}
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Eliminar
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Dato
                  </label>
                  <select
                    value={field.dataType || "text"}
                    onChange={(e) =>
                      updateField(field.id, { dataType: e.target.value as any })
                    }
                    className="w-full p-2 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="text">Texto</option>
                    <option value="number">Número</option>
                    <option value="email">Email</option>
                    <option value="date">Fecha</option>
                    <option value="tel">Teléfono</option>
                    <option value="url">URL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor por Defecto
                  </label>
                  <input
                    type={field.dataType === "number" ? "number" : "text"}
                    value={(field.defaultValue as string) || ""}
                    onChange={(e) =>
                      updateField(field.id, { defaultValue: e.target.value })
                    }
                    placeholder="Valor por defecto"
                    className="w-full p-2 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <input
                type="text"
                value={field.placeholder}
                onChange={(e) =>
                  updateField(field.id, { placeholder: e.target.value })
                }
                placeholder="Texto de Ayuda"
                className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
              />

              <textarea
                value={field.description || ""}
                onChange={(e) =>
                  updateField(field.id, { description: e.target.value })
                }
                placeholder="Descripción del campo"
                className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
                rows={2}
              />

              {renderFieldValidation(field)}
              {renderFieldCustomization(field)}

              {(field.type === "select" ||
                field.type === "multiselect" ||
                field.type === "radio" ||
                field.type === "checkbox") && (
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-gray-700">
                    Opciones
                  </label>
                  {field.type === "checkbox" ? (
                    <div className="space-y-4">
                      {((field.options as CheckboxOptions[]) || []).map(
                        (option, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 rounded-xl p-6 space-y-4 border border-blue-100"
                          >
                            <div className="flex justify-between">
                              <input
                                type="text"
                                value={option.label}
                                onChange={(e) => {
                                  const newOptions = [
                                    ...((field.options as CheckboxOptions[]) ||
                                      []),
                                  ];
                                  newOptions[index] = {
                                    ...option,
                                    label: e.target.value,
                                  };
                                  updateField(field.id, {
                                    options: newOptions,
                                  });
                                }}
                                placeholder="Etiqueta de la Opción"
                                className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
                              />
                              <button
                                onClick={() => {
                                  const newOptions = [
                                    ...((field.options as CheckboxOptions[]) ||
                                      []),
                                  ];
                                  newOptions.splice(index, 1);
                                  updateField(field.id, {
                                    options: newOptions,
                                  });
                                }}
                                className="ml-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                Eliminar
                              </button>
                            </div>
                            <input
                              type="text"
                              value={option.description || ""}
                              onChange={(e) => {
                                const newOptions = [
                                  ...((field.options as CheckboxOptions[]) ||
                                    []),
                                ];
                                newOptions[index] = {
                                  ...option,
                                  description: e.target.value,
                                };
                                updateField(field.id, { options: newOptions });
                              }}
                              placeholder="Descripción (opcional)"
                              className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
                            />
                            <div className="flex items-center space-x-8">
                              <label className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={option.disabled || false}
                                  onChange={(e) => {
                                    const newOptions = [
                                      ...((field.options as CheckboxOptions[]) ||
                                        []),
                                    ];
                                    newOptions[index] = {
                                      ...option,
                                      disabled: e.target.checked,
                                    };
                                    updateField(field.id, {
                                      options: newOptions,
                                    });
                                  }}
                                  className="w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 rounded-lg transition-all duration-200"
                                />
                                <span className="text-gray-700 font-medium">
                                  Deshabilitado
                                </span>
                              </label>
                              <label className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={option.checked || false}
                                  onChange={(e) => {
                                    const newOptions = [
                                      ...((field.options as CheckboxOptions[]) ||
                                        []),
                                    ];
                                    newOptions[index] = {
                                      ...option,
                                      checked: e.target.checked,
                                    };
                                    updateField(field.id, {
                                      options: newOptions,
                                    });
                                  }}
                                  className="w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 rounded-lg transition-all duration-200"
                                />
                                <span className="text-gray-700 font-medium">
                                  Marcado por defecto
                                </span>
                              </label>
                            </div>
                          </div>
                        )
                      )}
                      <button
                        onClick={() => {
                          const newOptions = [
                            ...((field.options as CheckboxOptions[]) || []),
                          ];
                          newOptions.push({
                            label: "Nueva Opción",
                            value: `option_${newOptions.length + 1}`,
                            checked: false,
                            disabled: false,
                          });
                          updateField(field.id, { options: newOptions });
                        }}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Agregar Opción
                      </button>
                    </div>
                  ) : (
                    <textarea
                      value={field.options?.join("\n")}
                      onChange={(e) =>
                        updateField(field.id, {
                          options: e.target.value.split("\n"),
                        })
                      }
                      className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
                      rows={3}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-lg font-semibold"
        >
          Guardar Plantilla
        </button>
      </div>

      {/* Preview Panel */}
      <div className="w-1/2 p-8 bg-white rounded-xl shadow-xl border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Vista Previa</h3>
        <form className="space-y-8">
          {fields.map((field) => {
            const customization = getFieldCustomization(field);
            return (
              <div key={field.id} className="space-y-3">
                <label className="block text-lg font-semibold text-gray-700">
                  {field.label}
                  {field.isRequired && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {field.description && (
                  <p className="text-sm text-gray-500">{field.description}</p>
                )}
                {field.type === "text" && (
                  <input
                    type={field.dataType || "text"}
                    placeholder={field.placeholder}
                    defaultValue={field.defaultValue as string}
                    disabled={field.isDisabled}
                    readOnly={field.isReadOnly}
                    required={field.isRequired}
                    minLength={field.validation?.minLength}
                    maxLength={field.validation?.maxLength}
                    pattern={field.validation?.pattern}
                    className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 ${customization.color} ${customization.backgroundColor} ${customization.borderColor} ${customization.fontSize} ${customization.fontWeight}`}
                  />
                )}
                {field.type === "select" && (
                  <Select
                    options={field.options?.map((opt) => ({
                      value: opt,
                      label: opt,
                    }))}
                    placeholder="Seleccionar una opción"
                    isClearable
                    styles={customSelectStyles}
                    className="w-full"
                  />
                )}
                {field.type === "multiselect" && (
                  <Select
                    options={field.options?.map((opt) => ({
                      value: opt,
                      label: opt,
                    }))}
                    isMulti
                    placeholder="Seleccionar múltiples opciones"
                    styles={customSelectStyles}
                    className="w-full"
                  />
                )}
                {field.type === "checkbox" && (
                  <div className="space-y-4">
                    {Array.isArray(field.options) &&
                    field.options.length > 0 ? (
                      field.options.map((option, index) => {
                        const checkboxOption =
                          typeof option === "string"
                            ? { label: option, value: option }
                            : (option as CheckboxOptions);

                        return (
                          <div
                            key={`${field.id}-${index}`}
                            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-blue-100"
                          >
                            <input
                              type="checkbox"
                              id={`preview-${field.id}-${index}`}
                              disabled={checkboxOption.disabled}
                              defaultChecked={checkboxOption.checked}
                              className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 rounded-lg transition-all duration-200"
                            />
                            <div className="flex flex-col">
                              <label
                                htmlFor={`preview-${field.id}-${index}`}
                                className="text-gray-700 font-medium cursor-pointer"
                              >
                                {String(checkboxOption.label)}
                              </label>
                              {checkboxOption.description && (
                                <span className="text-gray-500 mt-1">
                                  {String(checkboxOption.description)}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-blue-100">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 rounded-lg transition-all duration-200"
                        />
                      </div>
                    )}
                  </div>
                )}
                {field.type === "radio" && (
                  <div className="space-y-4">
                    {field.options?.map((option) => (
                      <div
                        key={String(option)}
                        className="flex items-center p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-blue-100"
                      >
                        <input
                          type="radio"
                          name={`preview-${field.name}`}
                          value={String(option)}
                          className="w-5 h-5 text-blue-600 focus:ring-blue-400 border-blue-300 transition-all duration-200"
                        />
                        <label className="ml-4 text-gray-700 font-medium cursor-pointer">
                          {String(option)}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                {field.type === "image" && (
                  <div className="mt-2 flex justify-center px-8 pt-6 pb-8 border-2 border-blue-100 border-dashed rounded-xl hover:border-blue-400 transition-all duration-200">
                    <div className="space-y-2 text-center">
                      <svg
                        className="mx-auto h-14 w-14 text-blue-400"
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
                          htmlFor={`preview-${field.name}`}
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-400"
                        >
                          <span>Subir archivo</span>
                          <input
                            id={`preview-${field.name}`}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">o arrastrar y soltar</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF hasta 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
}
