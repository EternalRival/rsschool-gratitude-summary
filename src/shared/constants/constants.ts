const isProd = 1

export const baseUrl = isProd ? 'https://app.rs.school' : 'http://localhost:5173'
export const endpoint = isProd ? '/api/feedback/gratitude' : '/mock.json'
