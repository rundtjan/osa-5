import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import 'jest-dom/extend-expect'
import Ploki from './Ploki'

describe('<Ploki />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Ploki title='Testtitle' author='Testauthor' url='url' likes='1' lisaaja='Testy Testy' id='1111' />
    )
  })

  test('ensiksi näytetään ainoastaan perusinfoa', () => {
    const basicInfo = component.container.querySelector('.basicInfo')
    expect(basicInfo).not.toHaveStyle('display: none')

    const extraInfo = component.container.querySelector('.extraInfo')
    expect(extraInfo).toHaveStyle('display: none')

  })

  test('kun klikataan perusinfoa, näytetään muu info', () => {
    const div = component.container.querySelector('.basicInfo')
    fireEvent.click(div)

    const extraInfo = component.container.querySelector('.extraInfo')
    expect(div).not.toHaveStyle('display: none')
    expect(extraInfo).not.toHaveStyle('display: none')
  })

})