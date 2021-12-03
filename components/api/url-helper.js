
import axios from "axios";

const baseUrl = 'http://13.235.132.111/pandiyanstores';

export const registerUser = (data) => axios.post(`${baseUrl}/signup`, data);

export const getToken = (data) => axios.post(`${baseUrl}/signin`, data);

export const pagination = (payload) =>axios.get(`${baseUrl}/product/pagination/?pageNo=${payload}&pageSize=${12}`)

export const getListuser = () => axios.get(`${baseUrl}/user-list`);

export const productCreate = (loginFormData) =>axios({
    method: 'post',
    url: `${baseUrl}/product/create-product`,
    data: loginFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
})

export const productDelete = (data) =>axios({
    method: 'delete',
    url: `${baseUrl}/product/delete-product?productId=`+ data,
})
export const productUpdate = (loginFormData) =>axios({
    method: 'post',
    url: `${baseUrl}/product/update-product`,
    data: loginFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
})

export const createCategory = (loginFormData) =>axios({
    method: 'post',
    url: `${baseUrl}/category/create-category`,
    data: loginFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
})

export const updateCategory = (loginFormData) =>axios({
    method: 'post',
    url: `${baseUrl}/category/update-category`,
    data: loginFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
})

export const orderList = () => axios.get(`${baseUrl}/order-list`);

export const deleteCategory = (id) => axios.delete(`${baseUrl}/category/delete-category?categoryId=` + id, )

export const updateUser = (values) =>axios.post(`${baseUrl}/update-user`, values)

export const getUser = (id) => axios.get(`${baseUrl}/current-user`, id);

export const getCatrgrylist = () => axios.get(`${baseUrl}/category/category-list`);

export const forgotpassword = (data) => axios.get(`${baseUrl}/forget-password`, { params: data });

export const Resetps = (data) => axios.post(`${baseUrl}/reset-password/${data.emailId}`, data);

export const getProductList = () => axios.get(`${baseUrl}/product/product-list`);