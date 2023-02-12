const auth = {
  isAuthenticated: false,

  authenticate() {
    this.isAuthenticated = true
  },

  login(username, password) {
    console.log('login')
    if (
      (username === 'master' && password === 'master@123') ||
      (username === 'student' && password === 'student@123')
    ) {
      return true
    }

    return false
  },

  getRole(username) {
    if (username === 'master') {
      return 'master'
    }
    return 'student'
  },

  logout() {
    this.isAuthenticated = false
    // setTimeout(cb, 1)
  },
}

export default auth
