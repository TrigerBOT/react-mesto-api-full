export const baseUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`
export const authorization = localStorage.getItem('jwt');




