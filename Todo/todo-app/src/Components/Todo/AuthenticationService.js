import axios from 'axios'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
class AuthenticationService {
    
    executeBasicAuthenticationService(username, password) {
        return axios.get('http://localhost:8081/basicauth',{headers:{authorization:this.createBasicAuthToken(username,password)}})
    }
    createBasicAuthToken(username,password){
        return 'Basic ' +  window.btoa(username + ":" + password)
    }
    executeJwtAuthenticationService(username, password) {
        return axios.post(`http://localhost:8081/authenticate`, {
            username,
            password
        })
    }
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }
    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }
    createJWTToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return false
        return true
    }
    getLoggedInUsername(){
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return ''
        return user
    }
    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()