import React from 'react'
import { 
  render, waitForElement 
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
import 'jest-dom/extend-expect'

describe('<App />', () => {
  test('ennen kirjautumista, ei näytetä blogeja', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Kirjaudu')
    )

    const plokeja = component.container.querySelectorAll('.ploki')
    expect(plokeja.length).toBe(0) 

  })

  test('kirjautumisen jälkeen, näytetään blogeja', async () => {
    const user = {username: 'Bongo', token: '16161616161616', name: 'Bongo Wallen'}
    localStorage.setItem('blogUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Kirjaudu')
    )

    const plokeja = component.container.querySelectorAll('.ploki')
    expect(plokeja.length).toBe(3)
    expect(component.container).toHaveTextContent('Herjausten herjaukset')
    expect(component.container).toHaveTextContent('Rottien herjaukset')
    expect(component.container).toHaveTextContent('Hiirien herjaukset')

  })


})