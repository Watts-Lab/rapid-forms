// components/survey/index.tsx
import React from 'react';
import Checkbox from './inputs/checkbox';
import Radio from './inputs/radio';
import Submit from './inputs/submit';


export type ElementTypes = "checkbox" | "radio" ;

export type Element = {
  type: ElementTypes;
  name: string;
  title: string;
  description?: any;
  choices?: string[];
};

export type Attribute = {
  key: string;
  value: string;
};

export interface FormProps {
  elements: Element[];
  hiddenAttributes?: Attribute[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SinglePageForm = ({
  elements,
  hiddenAttributes,
  onChange,
  onSubmit,
}: FormProps) => {

  const createInput = (element: Element) => {
    switch (element.type) {// find right input based on type
      case 'radio':
        return <Radio {...element} onChange={onChange} />;
      case 'checkbox':
        return <Checkbox {...element} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit} className="rapid-form-single-page" data-testid="rapid-form">
      {elements.map(element => createInput(element))}
      {hiddenAttributes?.map(attribute => (
        <input type="hidden" name={attribute.key} value={attribute.value} />
      ))}
      <Submit />
    </form>
  );
};

export default SinglePageForm;
