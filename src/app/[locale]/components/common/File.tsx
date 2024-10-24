import React from 'react';
import { Controller } from 'react-hook-form';
import FormField from './FormField';

interface FileProps {
    type?: string;
    name: string;
    control: any;
    label: string;
    error?: string;
    required?: boolean;
}

let classNames = 'mt-1 block w-full text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

const File: React.FC<FileProps> = ({
    name, type,
    label,
    error,
    control,
    required,
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
                                <input
                                    {...field}
                                    type={type}
                                    className={classNames}
                                />
                            )}
                        />
                    ) : (
                        <input
                            type={type}
                            className={classNames}
                        />
                    )
                }
            </FormField>
        </div>
    );
};

export default File;
