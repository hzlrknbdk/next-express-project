import React from 'react';
import { Controller } from 'react-hook-form';
import FormField from './FormField';

interface CheckBoxProps {
    name: string;
    control?: any;
    label: string;
    type?: string;
    error?: string;
    required?: boolean;
    options: { label: string; value: string }[];
}

const CheckBoxGroup: React.FC<CheckBoxProps> = ({
    name,
    control,
    label,
    options,
    type,
    error,
    required
}) => {
    return (
        <div className="mb-6">
            <FormField name={name} label={label} error={error} required={required} >
                {
                    control ? (
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col space-y-2">
                                    {options.map((option) => (
                                        <label key={option.value} className="flex items-center text-gray-500  text-sm">
                                            <input {...field} type={type} value={field.value} required={required} className="mr-2" />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            )}
                        />
                    ) : (
                        <div className="flex flex-col space-y-2">
                            {options.map((option) => (
                                <label key={option.value} className="flex items-center text-gray-500  text-sm">
                                    <input type={type} required={required} value={option.value} className="mr-2" />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    )
                }
            </FormField>


        </div>
    );
};

export default CheckBoxGroup;
