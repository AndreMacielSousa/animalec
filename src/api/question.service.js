import API_URL from './config.js'

export const questionService = {
  async getQuestions(token) {
    const response = await fetch(`${API_URL}/questions`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },
  async addQuestion(token, payload) {
    const response = await fetch(`${API_URL}/questions`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },
  async editQuestion(token, payload) {
    const response = await fetch(`${API_URL}/questions/${payload._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },
  async removeQuestion(token, id) {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  }
};

function handleResponses(code) {
  let message = ""
  switch (code) {
    case 401:
      message = "Não está autorizado a executar esta ação!"
      break;
    case 409:
      message = "Já existe um utilizador com este username!"
      break;
    default:
      message = "Mensagem desconhecida"
      break;
  }
  return message
}

export default questionService;
