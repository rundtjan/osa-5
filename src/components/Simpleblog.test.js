test('renders content', () => {
    const blog = {
      title: 'Funny stuff',
      author: 'Gregorius Puff',
      likes: 2
    }
  
    const component = render(
      <Note note={note} />
    )
  
    // tapa 1
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  
    // tapa 2
    const element = component.getByText(
      'Component testing is done with react-testing-library'
    )
    expect(element).toBeDefined()
  
    // tapa 3
    const div = component.container.querySelector('.note')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })