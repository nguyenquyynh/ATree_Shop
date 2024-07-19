const { Axios } = require("axios");
const { default: AxiosInstance } = require("../AxiosInstance")

const RequestAPI = {
    //Đăng kí người dùng mới
    Register: async (body) => {
        try {
            const result = await AxiosInstance().post('users/register', body);
            return result
        } catch (error) {
            console.log('------------------>', error)
            const response = error.response
            return response.data
        }
    },
    //Đăng nhập 
    Login: async (body) => {
        try {
            const result = await AxiosInstance().post('/users/login', body)
            return result
        } catch (error) {
            const response = error.response
            return response.data
        }
    },
    //Cập nhật thông tin người dùng
    UpdateUser: async (body) => {
        try {
            const result = await AxiosInstance().post('users/update', body);
            return result
        } catch (error) {
            console.log('------------>', error)
            const response = error.response;
            return response.data
        }
    },
    //Lấy sản phẩm theo id
    GetProductById: async (query) => {
        try {
            const result = await AxiosInstance().get(`products/detail?id=${query}`)
            return result
        } catch (error) {
            console.log('-------------------->', error)
            const response = error.response
            return response.data
        }
    },
    //Lấy product by category 
    GetProduct: async (idcategory, prototype = 'All') => {
        try {
            const result = await AxiosInstance().get(`/products/category?id=${idcategory}&prototype=${prototype}`);
            return result
        } catch (error) {
            console.log("------------------------>", error)
            const response = error.response
            return response.data
        }
    },
    //Thêm sản phẩm vào giỏ hàng
    AddtoCart: async (body) => {
        try {
            const result = await AxiosInstance().post('/users/cart/add', body)
            return result
        } catch (error) {
            console.log("------------------> ", error)
            const response = error.response
            return response.data
        }
    },
    //Tìm kiếm sản phẩm
    SearchProduct: async (keyword, page = 0) => {
        try {
            const result = await AxiosInstance().get(`products/search?keyword=${keyword}&page=${page}`, null)
            return result
        } catch (error) {
            console.log("------------------> ", error)
            const response = error.response
            return response.data
        }
    },
    //Xóa tất cả giỏ hàng
    RemoveCart: async (body) => {
        try {
            const result = await AxiosInstance().post(`users/cart/update`, body)
            return result
        } catch (error) {
            console.log("------------------> ", error)
            const response = error.response
            return response.data
        }
    },
    //Lấy đặc tính sinh trưởng của loại sản phẩm
    GetPrototypes: async (query) => {
        try {
            const result = await AxiosInstance().get(`categories/prototypes?_id=${query}`)
            return result
        } catch (error) {
            console.log("------------------> ", error)
            const response = error.response
            return response.data
        }
    },
    //Lấy sản phẩm theo danh mục và prototypes
    GetProductByCategory: async (body) => {
        try {
            const result = await AxiosInstance().get(`products/category?id=${body._id}&prototype=${body.prototypes}&page=${body.page}`)
            return result
        } catch (error) {
            console.log("------------------> ", error)
            const response = error.response
            return response.data
        }
    },
    //Tạo đơn hàng mới
    CreateOrder: async (body) => {
        try {
            const result = await AxiosInstance().post('orders/add', body)
            return result
        } catch (error) {
            console.log('------------------>', error)
            const response = error.response;
            return response.data
        }
    },
    //Hủy đơn hàng
    CancelOrder: async (body) => {
        try {
            const result = await AxiosInstance().post('orders/update', body)
            return result
        } catch (error) {
            console.log('-------------->', error)
            const response = error.response
            return response.data
        }
    },
    //Lấy chi tiết đơng hàng theo id 
    GetOrderById: async (params) => {
        try {
            const result = await AxiosInstance().get(`orders/detail/${params}`, null)
            return result
        } catch (error) {
            console.log('-------------->', error)
            const response = error.response
            return response.data
        }
    },
    GetTipTreePlant: async (page = 0) => {
        try {
            const result = await AxiosInstance().get(`products/tip/?page=${page}`, null)
            return result
        } catch (error) {
            console.log('-------------->', error)
            const response = error.response
            return response.data
        }
    },
    GetListOrderByIdUser: async (query) => {
        try {
            const result = await AxiosInstance().get(`orders/getbyuser?_id=${query}`, null)
            return result
        } catch (error) {
            console.log('-------------->', error)
            const response = error.response
            return response.data
        }
    }
}

module.exports = RequestAPI