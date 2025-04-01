
import { getToken } from "@/libs/utils"; // 引入获取 token 的工具函数
import {onKycDetail} from "@/api/user";

export default {
    state: {
      // token
      kycInitList:[],
      detailList:[],


      authLevel: null,
      auditStatus: null,
    },
    getters: {
      getKycInitList: (state) => state.kycInitList,
      getDetailList: (state) => state.detailList,

      getAuthLevel: (state) => state.authLevel,
      getAuditStatus: (state) => state.auditStatus,
    },
    mutations: {
     
      setKycInitList(state, payload) {
        state.kycInitList = payload;
      },
      setDetailList(state, payload) {
        state.detailList = payload;
      },

      setAuthLevel(state, level) {
        state.authLevel = level;
      },
      setAuditStatus(state, status) {
        state.auditStatus = status;
      },
    
    },
    actions: {

        async kycInitDetail({ commit }, token = null) {
            if (!token) token = getToken(); // 从 localStorage 获取 token

            

            Promise.try(() => {
              return onKycDetail()
             }).then(res => {
              
              if (res.code === 200) {
                const { authLevel, auditStatus } = res.data;
                commit('setAuthLevel', authLevel);
                commit('setAuditStatus', auditStatus);
              } else {
                // 处理错误消息
                this.$customMessage(2, res.msg);
              }
             }).catch((e)=>{
              console.log(e);
              
             })
            // const authVerifyRequestVO = {};
            // try {
            //   const res = await axios.post('/app/bsex-user/kyc/lv1/detail', authVerifyRequestVO, {
            //     headers: {
            //       'x-language': 'zh_CN',
            //       'x-device-id': '', // 设备唯一标识
            //       'x-app-type': 'WEB',
            //       'x-app-version': '', // app版本号
            //       'x-app-token': token,
            //       'x-device-model': '', // 设备型号
            //     },
            //   });

            //   if (res.data.code === 200) {
            //     const { authLevel, auditStatus } = res.data.data;
            //     commit('setAuthLevel', authLevel);
            //     commit('setAuditStatus', auditStatus);
            //   } else {
            //     // 处理错误消息
            //     this.$customMessage(2, res.data.msg);
            //   }
            // } catch (e) {
            //   console.log(e);
            // }
          },
     
     
    },
  };
  