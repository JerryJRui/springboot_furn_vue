// 引入axios
import axios from "axios";
// 通过axios创建对象-request对象，用于发送请求到后端
const request = axios.create({
    timeout: 5000
})
//request拦截器的原理
// 1.可以对请求做统一的处理
// 2.比如统一的加入token，content-type等
request.interceptors.request.use(config => {
    config.headers['Contend-Type'] = 'application/json;charset=utf-8'
    return config
}, error => {
    return Promise.reject(error)
})


//response拦截器 可以在调用接口相应后 统一的处理返回结果
request.interceptors.response.use(
    response => {
        let res = response.data
        //如果返回的是文件，就返回
        if (response.config.responseType === "blob") {
            return res
        }
        //如果是string，就转成Json
        if (typeof res === 'string') {
            //如果res，不为null，就进行转换成json对象
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log("err",error)
        return Promise.reject(error)
    }
)

// 导出request
export default request