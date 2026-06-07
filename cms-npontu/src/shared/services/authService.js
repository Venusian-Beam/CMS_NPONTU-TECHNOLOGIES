import client from '@shared/utils/axios'

export const authService = {
  async login(credentials) {
    await client.get('/sanctum/csrf-cookie')
    const { data } = await client.post('/login', credentials)
    return data
  },

  async me() {
    const { data } = await client.get('/me')
    return data
  },

  async logout() {
    await client.post('/logout')
  },

  async forgotPassword(email) {
    const { data } = await client.post('/forgot-password', { email })
    return data
  },

  async resetPassword(payload) {
    const { data } = await client.post('/reset-password', payload)
    return data
  },
}
