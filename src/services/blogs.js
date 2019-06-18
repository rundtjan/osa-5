import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const teeToken = uusiToken => {
  token = `bearer ${uusiToken}`
}

const naytaToken = () => {
  console.log(token)
}

const create = async uusiPloki => {
  const config = {  headers: {  Authorization: token, port: 3003  } }
  console.log(config)
  const response = await axios.post(baseUrl, uusiPloki, config)
  return response.data
}

const trash = async id => {
  const config = {  headers: {  Authorization: token  }, port: 3003 }
  const res = await axios.delete(baseUrl+'/'+id, config)
  return res
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const like = async id => {
  const res = await axios.put(baseUrl+'/' + id)
  return res
}

export default { getAll, create, teeToken, naytaToken, like, trash }