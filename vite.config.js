
export default {
  server: {
    proxy: {
      '/product': 'https://dealavo-backend.onrender.com',
      '/track': 'https://dealavo-backend.onrender.com',
      '/tracked': 'https://dealavo-backend.onrender.com'
    }
  }
}
