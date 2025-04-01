import * as api from "@/api/square";
// 广场数据
export default {
  state: {
    // 查看我的个人主页
    communityPersonalInformation: null,
    editPersonalInfo: null, //编辑个人信息
  },
  getters: {
    getCommunityPersonalInformation: (state) =>
      state.communityPersonalInformation,
    getEditPersonalInfo: (state) => state.editPersonalInfo,
  },
  mutations: {
    setCommunityPersonalInformation(state, payload) {
      state.communityPersonalInformation = payload;
    },
    setEditPersonalInfo(state, payload) {
      state.editPersonalInfo = payload;
    },
  },
  actions: {
    async handleSetCommunityPersonalInformation({ commit }, payload) {
      let res = await api.$viewPersonalHomepage();
      commit("setCommunityPersonalInformation", res.data.data);
    },
    handleSetEditPersonalInfo({ commit }, payload) {
      commit("setEditPersonalInfo", payload);
    },
  },
};
