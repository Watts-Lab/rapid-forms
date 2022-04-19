# Rapid Forms

This project is a minimalist framework to allow for rapid creation of forms. The philosophy of this framework is to be extremely unopionated with styling, be extremely flexible, and easy to use. 

Package created and maintained by Watts Lab at the University of Pennsylvania

## Installation
For the latest release,
`npm install https://github.com/Watts-Lab/rapid-forms`

For the stable release,
`npm install @watts-lab/rapid-forms`

## Contributors

## Contributing to the codebase
The code base is organized with two key components-- src/index.tsx and `src/inputs/*.tsx`. Index.tsx is a main entrypoint for the code and exports components that can be used when rapid-forms is imported. Currently, there is one key component that is exported which is the SinglePageForms. `inputs/*.ts` contains all the individual input components that are used in Forms. **Every input should be individually tested. No PR will be accepted without a test for your input**

## Publishing to npm with np
We use np for publshing to npm
Install with the following command `npm install --global np`
To Publish, simply `np` in the root directory


## Usage 

### Styling 
All forms come unformated. To format, these inputs with your css stylings, you can override global inputs such as
```css
input[type="radio"] {
    // your css
}
```

Or you can override them through rapid forms classname in your css style sheets. This is an exhaustive list

```css
.rapid-form-single-page {
   // your css
}

.rapid-forms-input-block {
   // your css
}

.rapid-forms-title {
    // your css
}

.rapid-forms-description {
    // your css
}

.rapid-forms-submit {
    // your css
}

.rapid-forms-checkbox-input {
    // your css
}

.rapid-forms-checkbox-label {
    // your css
}

.rapid-forms-radio-input {
    // your css
}

.rapid-forms-radio-label {
    // your css
}
```

### Single Page Form

#### Questions
The format that a question takes is that of below. (? marks optional elements)
```
{
    "type": the type of input (currently only support radio and checkbox),
    "name": the name of the input note for (checkboxes each choice will have unique name as (name-index))
    "title": the question that you should be asking   
    "description"?: Text that appears below the title and accepts html as input
    "choices"?: array of string of choices (only applicable to radio groups and checkboxes)
}
```

Here is an example.
```tsx
  const questions: Element[] = [
    {
      type: 'radio',
      name: 'color',
      title: 'What is your favorite color?',
      description: (<> <p> Let us know if we should add more </p> </>),
      choices: ['Red', 'Blue', 'Yellow'],
    },
    {
      type: 'checkbox',
      name: 'color-dont',
      title: 'Select all colors that you do not like',
      description: (<> <p> Let us know if we should add more </p> </>),
      choices: ['Red', 'Blue', 'Yellow'],
    },
  ]
```

#### Event handlers
Rapid-Forms is extremely unopinonated on how you handle your data and submission. So, you 
must define onChange and onSubmit function. We use a reference from react to keep track of
data for changes in state.

Note that checkbox and radio groups will have checked element and must be handled seperately.
```tsx
const data = React.useRef<Record<string, any>>({});

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name
    if (event.target.checked !== undefined) {
        data.current[name] = event.target.checked ? value : null
    } else {
        data.current[name] = value
    } 
}
```
On submission, the reference data will have all the information
```tsx
const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // do something with data
    console.log(data.current)
}
```

#### Render Component
```tsx
<SinglePageForm elements={questions} onChange={onChange} onSubmit={onSubmit} />
```

#### Full Code
```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SinglePageForm, Element } from '../.';

const App = () => {
  const data = React.useRef<Record<string, any>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const questions: Element[] = [
    {
      type: 'radio',
      name: 'color',
      title: 'What is your favorite color?',
      description: (<> <p> Let us know if we should add more </p> </>),
      choices: ['Red', 'Blue', 'Yellow'],
    },
    {
      type: 'checkbox',
      name: 'color-dont',
      title: 'Select all colors that you do not like',
      description: (<> <p> Let us know if we should add more </p> </>),
      choices: ['Red', 'Blue', 'Yellow'],
    },
  ]

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name
    if (event.target.checked !== undefined) {
      data.current[name] = event.target.checked ? value : null
    } else {
      data.current[name] = value
    } 
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // do something with data
    setSubmitted(true)
    console.log(data.current)
  }

  return (
    <>
      { 
        !submitted ? 
        <SinglePageForm elements={questions} onChange={onChange} onSubmit={onSubmit} />
        : <>Thank you for submitting! </>
      }
    </>
  )
  
};

ReactDOM.render(<App />, document.getElementById('root'));
```


Contributors
-------------
1. Sumant R. Shringari

