import React from "react";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

interface Option {
    value: string | number;
    label: string;
}

interface SelectFieldProps {
    name: string;
    control?: any;
    label?: string;
    options: Option[];
    placeholder?: string;
    error?: string;
    required?: boolean;
    showLabel?: boolean;
    classNames?: string
    onChange?: (value: string | number) => void;
}

const defaultClassNames =
    "appearance-none w-80 rounded-md grid grid-cols-2 gap-6 px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

const SelectBox: React.FC<SelectFieldProps> = ({
    name,
    label,
    options,
    error,
    control,
    required,
    onChange,
    placeholder,
    classNames = defaultClassNames
}) => {
    return (
        <FormField name={name} label={label} error={error} required={required}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            id={name}
                            className={classNames}
                            role="combobox"
                            onChange={(event) => {
                                field.onChange(event.target.value);
                                if (onChange) {
                                    onChange(event.target.value);
                                }
                            }}
                        >
                            {placeholder && <option value="">{placeholder}</option>}
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                />
            ) : (
                <select
                    id={name}
                    className={classNames}
                    role="combobox"
                    onChange={(event) => {
                        if (onChange) {
                            onChange(event.target.value);
                        }
                    }}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        </FormField>
    );
};

export default SelectBox;
