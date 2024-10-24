interface FormFieldProps {
    name: string;
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    error,
    required,
    children
}) => {
    return (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default FormField;
