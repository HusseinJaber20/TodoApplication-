import axios from 'axios'
class HelloWorldService {

    executeHelloWorldService(){
        return axios.get('http://localhost:8081/hello-world')
    }
    executeHelloWorldBeanService(){
        return axios.get('http://localhost:8081/hello-world-bean')
    }
    executeHelloWorldPathVariableService(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8081/hello-world/path-variable/${name}`
        );
    }
}
export default new HelloWorldService()