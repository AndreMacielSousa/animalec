import API_URL from "./config.js";

export const authService = {
  async login(payload) {
    const response = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      const data = await response.json();
      const token = response.headers.get("Authorization");
      const profile = data.body;
      return { token, profile };
    } else {
      throw Error(handleResponses(response.status));
    }
  },
  /**
   * Registers a new user
   * @param {asd ads} payload
   */
  async register(payload) {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },
  async getInfo(token) {
    const response = await fetch(`${API_URL}/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    return await response.json();
  }
};

function handleResponses(code) {
  let message = "";
  switch (code) {
    case 401:
      message = "Não está autorizado a executar esta ação!";
      break;
    case 403:
      message = "Dados das credenciais errados!";
      break;
    case 406:
      message = "Dados do utilizador já existentes!";
      break;
    default:
      message = "Mensagem desconhecida";
      break;
  }
  return message;
}

export default authService;
