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
