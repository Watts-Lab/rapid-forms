import * as React from 'react';

export interface ChildInputProps {
  name: string;
  title: string;
  description?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BaseInputProps {
  title: string;
  description?: string;
  name: string;
  children: any;
}

export default function Base({
  title,
  description,
  name,
  children,
}: BaseInputProps) {
  return (
    <div className="rapid-forms-input-block inputBlock">
      <span>
        {' '}
        <h4 className="rapid-forms-title" data-testid={`${name}-title`}>
          {title}
        </h4>{' '}
      </span>
      <span>
        {' '}
        <p className="rapid-forms-description" data-testid={`${name}-description`}>
          {description}
        </p>{' '}
      </span>
      {children}
    </div>
  );
}
