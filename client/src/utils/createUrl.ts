export default (url: string) =>
  `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api${url}`;
