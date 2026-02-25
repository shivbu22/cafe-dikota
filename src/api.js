const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
    const token = localStorage.getItem('dakoti_admin_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'x-auth-token': token } : {})
    };
};

export const api = {
    // Auth
    login: async (credentials) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.msg || 'Login failed');
        }
        return res.json();
    },

    // Menu
    getMenu: async () => {
        const res = await fetch(`${API_URL}/menu`);
        return res.json();
    },
    addMenuItem: async (item) => {
        const res = await fetch(`${API_URL}/menu`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(item)
        });
        return res.json();
    },
    deleteMenuItem: async (id) => {
        const res = await fetch(`${API_URL}/menu/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return res.json();
    },

    // Orders
    submitOrder: async (order) => {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });
        return res.json();
    },
    getOrders: async () => {
        const res = await fetch(`${API_URL}/orders`, {
            headers: getHeaders()
        });
        return res.json();
    },
    updateOrderStatus: async (id, status) => {
        const res = await fetch(`${API_URL}/orders/${id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        return res.json();
    },

    // Messages
    sendMessage: async (message) => {
        const res = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });
        return res.json();
    },
    getMessages: async () => {
        const res = await fetch(`${API_URL}/messages`, {
            headers: getHeaders()
        });
        return res.json();
    },
    markMessageRead: async (id) => {
        const res = await fetch(`${API_URL}/messages/${id}`, {
            method: 'PATCH',
            headers: getHeaders()
        });
        return res.json();
    },
    deleteMessage: async (id) => {
        const res = await fetch(`${API_URL}/messages/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return res.json();
    }
};
