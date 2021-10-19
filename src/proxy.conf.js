const PROXY_CONFIG = [
  {
    context: ["/countries", "/products", "/users"],
    target: "http://localhost:3000",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
