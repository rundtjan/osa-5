import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Simpleblog from './Simpleblog'

afterEach(cleanup)

test('sisältö löytyy', () => {
  const blog = {
    title: 'Funny stuff',
    author: 'Gregorius Puff',
    likes: 2
  }

  const component = render(
    <Simpleblog blog={blog}/>
  )
  const div = component.container.querySelector('.info')
  expect(div).toHaveTextContent(
    'Funny stuff Gregorius Puff'
  )
  const div2 = component.container.querySelector('.likes')
  expect(div2).toHaveTextContent(
    'blog has 2 likes'
  )
})

test('napinpainallus', () => {
  const blog = {
    title: 'Funny stuff',
    author: 'Gregorius Puff',
    likes: 2
  }

  const tekoFunc = jest.fn()

  const { getByText } = render(
    <Simpleblog blog={blog} onClick={tekoFunc}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(tekoFunc.mock.calls.length).toBe(2)
})