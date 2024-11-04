import React from "react";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

interface InputFieldProps {
    name: string;
    control?: any;
    label: string;
    type?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    widthSize?: string;
    onChange?: (value: any) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    name,
    type,
    label,
    error,
    control,
    onChange,
    required,
    widthSize,
    placeholder,
}) => {
    let classNames = `appearance-none rounded-md ${widthSize} px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`;

    return (
        <FormField name={name} label={label} error={error} required={required}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            className={classNames}
                            onChange={(e) => {
                                field.onChange(e);
                                if (onChange) {
                                    onChange(e.target.value);
                                }
                            }}
                        />
                    )}
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    className={classNames}
                    onChange={(e) => {
                        if (onChange) {
                            onChange(e.target.value);
                        }
                    }}
                />
            )}
        </FormField>
    );
};

export default InputField;
