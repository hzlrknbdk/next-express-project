import React from "react";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

interface CheckBoxProps {
    name: string;
    control?: any;
    label: string;
    type?: string;
    error?: string;
    required?: boolean;
    selectedValues?: string[];
    onChange?: (values: string[]) => void;
    options: { label: string; value: string }[];
}

const CheckBoxGroup: React.FC<CheckBoxProps> = ({
    name,
    label,
    error,
    control,
    options,
    required,
    onChange,
    type = "checkbox",
    selectedValues = [],
}) => {
    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
        let updatedValues = [...selectedValues];
        if (checked) {
            updatedValues.push(optionValue);
        } else {
            updatedValues = updatedValues.filter((value) => value !== optionValue);
        }
        if (updatedValues.length !== selectedValues.length) {
            onChange?.(updatedValues);
        }
    };

    return (
        <FormField name={name} label={label} error={error} required={required}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-col space-y-2">
                            {options.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center text-gray-500 text-sm"
                                >
                                    <input
                                        {...field}
                                        type={type}
                                        value={option.value}
                                        onChange={(e) => {
                                            handleCheckboxChange(option.value, e.target.checked);
                                        }}
                                        className="mr-2"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    )}
                />
            ) : (
                <div className="flex flex-col space-y-2">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center text-gray-500 text-sm"
                        >
                            <input
                                type={type}
                                value={option.value}
                                checked={selectedValues.includes(option.value)}
                                onChange={(e) => {
                                    handleCheckboxChange(option.value, e.target.checked);
                                }}
                                className="mr-2"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </FormField>
    );
};

export default CheckBoxGroup;
