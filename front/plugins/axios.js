import axios from 'axios'
import Vue from 'vue'

const service = axios.create({
    baseURL: '/api'
})

// 请求拦截

// 响应拦截

Vue.prototype.$http = service

export const http = service