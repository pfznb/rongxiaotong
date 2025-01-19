import { request } from '../utils/request'


// 添加到收藏夹
export function addOrderToCollect(params) {
    return request({
        method: 'post',
        url: 'cart/addcollect/' + params.order_id,
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}

// 展示收藏夹列表
export function showcollect(params) {
    return request({
        method: 'get',
        url: 'cart/showcollect',
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}

// 收藏夹删除商品
export function collectdelete(params) {
    return request({
        method: 'delete',
        url: 'cart/collectdelete/' + params.order_id,
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}



// 添加商品到购物车
export function addOrderToCart(params) {
    return request({
        method: 'post',
        url: 'cart/add/' + params.order_id,
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}

// 购物车删除商品
export function cartDeleteOrder(params) {
    return request({
        method: 'delete',
        url: 'cart/delete/' + params.order_id,
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}

// 展示购物车列表
export function cartShow(params) {
    return request({
        method: 'get',
        url: 'cart/show',
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}

// 更新商品数量  /cart/update/{id}/{count}
export function updateGoodsCount(params) {
    return request({
        method: 'put',
        url: `/cart/update/${params.id}/${params.count}`,
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}