// Backwards compatibility: re-export parseApiError as isAxiosError
// New code should import from '../services/GeneralApi' or '../errors'
export { parseApiError as isAxiosError } from "../services/GeneralApi";
