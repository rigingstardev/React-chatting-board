export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      console.log("Axios Setup");
      const {
        auth: { authToken }
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );
}
