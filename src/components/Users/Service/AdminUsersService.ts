
import { ref } from "vue";
import StatusMappingRepository from '../Repositories/BackendRepository'

/**
 * Init repository
 */
const repository = new StatusMappingRepository();

/**
 * Init users
 */
const users = ref([]);

/**
 * Init service
 */
const init = async () => {
    await getUsers();
}

/**
 * Get users from backend
 */
const getUsers = async () => {
    users.value = await repository.getUsers();
}

export { init, users };
