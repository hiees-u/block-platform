import { Controller, useFormContext } from "react-hook-form";

interface CustomFieldProps {
  name: string;
  label?: string;
  type?: string;
}

export function CustomField({
  name,
  label,
  type = "text",
}: CustomFieldProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={`mt-1 block w-full px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
        )}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
