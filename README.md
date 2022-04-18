# Rapid Forms

This project is a minimalist framework to allow for rapid creation of forms. The philosophy of this framework is to be extremely unopionated with styling, be extremely flexible, and easy to use.

## Installation
`npm install @watts-lab/rapid-forms`

## Usage 

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
```
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
    setSubmitted(true)
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