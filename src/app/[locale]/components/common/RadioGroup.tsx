import React from "react";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

interface RadioGroupProps {
    name: string;
    control: any;
    label: string;
    options: { label: string; value: string }[];
    error?: string;
    required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    control,
    label,
    options,
    error,
    required,
}) => {
    return (
        <FormField name={name} label={label} error={error} required={required}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center space-x-6 text-sm">
                            {options.map((option) => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        {...field}
                                        type="radio"
                                        value={option.value}
                                        checked={field.value === option.value}
                                        className="mr-2"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    )}
                />
            ) : (
                <div className="flex items-center space-x-6">
                    {options.map((option) => (
                        <label key={option.value} className="flex items-center">
                            <input
                                type="radio"
                                value={option.value}
                                checked={!!option.value}
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

export default RadioGroup;
