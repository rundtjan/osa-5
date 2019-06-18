import axios from 'axios'
const baseUrl = '/api/login'

const login = async kirjautumistiedot => {
  const response = await axios.post(baseUrl, kirjautumistiedot)
  return response.data
}

export default { login }