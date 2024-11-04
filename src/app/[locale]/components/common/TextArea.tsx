import React from "react";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

interface TextAreaProps {
    name: string;
    control?: any;
    label: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
}

let classNames =
    "appearance-none rounded-md w-80 px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

const TextArea: React.FC<TextAreaProps> = ({
    name,
    control,
    label,
    error,
    placeholder,
    required,
}) => {
    return (
        <FormField name={name} label={label} error={error} required={required}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            className={classNames}
                        />
                    )}
                />
            ) : (
                <textarea id={name} placeholder={placeholder} className={classNames} />
            )}
        </FormField>
    );
};

export default TextArea;
