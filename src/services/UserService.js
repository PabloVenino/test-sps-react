import api, { user_endpoints } from "../api/index";

class UserService {
  async list() {
    try {
      const users = await api.get(user_endpoints.get_users);
      return users;
    }
    catch(error) {
      console.error(error)
    }
  }
  async get(id) {
    try {
      const user = await api.get(user_endpoints.get_user(id))
      return user;
    }
    catch(error) {
      console.error(error)
    }
  }
  async create(data) {
    try {
      const user = await api.post(user_endpoints.create_user, data);
      return user;
    }
    catch(error) {
      console.error(error)
    }
  }
  async delete(id) {
    try {
      const response = await api.delete(user_endpoints.delete_user(id))
      return response;
    }
    catch(error) {
      console.error(error)
    }
  }
  async update(id, data) {
    try {
      const response = await api.put(user_endpoints.update_user(id), data)
      return response;
    }
    catch(error) {
      console.error(error)
    }
  }
}

export default UserService;
