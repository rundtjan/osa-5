const blogs = [
    {
      id: '5a451df7571c224a31b5c8ce',
      author: 'Dandy Warhol',
      title: 'Herjausten herjaukset',
      url: 'www.google.com',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'Mongo',
        name: 'Bongo Wallen'
      }
    },
    {
        id: '5a451df7571c224a31b5c7ce',
        author: 'Mandy Warhol',
        title: 'Rottien herjaukset',
        url: 'www.google.com',
        user: {
          _id: '5a437a9e514ab7f168ddf138',
          username: 'Mongo',
          name: 'Bongo Wallen'
        }
      },
      {
        id: '5a451df7571c224a31b5c7ce',
        author: 'Randy Warhol',
        title: 'Hiirien herjaukset',
        url: 'www.google.com',
        user: {
          _id: '5a437a9e514ab7f168ddf138',
          username: 'Mongo',
          name: 'Bongo Wallen'
        }
      }
  ]
  
  const getAll = () => {return Promise.resolve(blogs)}

  const teeToken = () => {return}
  
  export default { getAll, teeToken }