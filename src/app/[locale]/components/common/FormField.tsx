import { cloneElement } from "react";

interface FormFieldProps {
    name: string;
    label?: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    error,
    required,
    children,
}) => {
    return (
        <div className="mb-3">
            {label && <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>}
            <div className="flex flex-col">
                {cloneElement(children as React.ReactElement, { id: name })}
                {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
            </div>
        </div>
    );
};

export default FormField;
