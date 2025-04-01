
import { getToken } from '../libs/utils';
const baseWssApi = process.env.VUE_APP_BASE_LOCAL_WSURL
const token = getToken();
const urls = `${baseWssApi}/ws/zh_cn/${token}`;

export  {
  urls
}
