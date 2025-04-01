
<template>
 <div style="margin-top: 30px; margin-left: 30px;">
  <div style="color: #F0F0F0; font-size: 15px; margin-bottom: 11px; ">温馨提示</div>
<div class="flex ic" style="height: 17px;color: #737373;">
  <div style="background-color: #737373;width: 4px; height: 4px; border-radius: 50%;"></div>
  <div style="height: 17px; margin-left: 6px;">最小提币数量为:{{ withdrawMin }} {{coinName}}。提示:出金需要完成首次入金后才可以进行，但没有币种限制。</div>
</div>
<div class="flex ic" style="height: 17px;color: #737373; margin-top: 3px;">
  <div style="background-color: #737373;width: 4px; height: 4px; border-radius: 50%;"></div>
  <div style="height: 17px; margin-left: 6px;">为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</div>
</div>
<div class="flex ic" style="height: 17px;color: #737373;margin-top: 3px;">
  <div style="background-color: #737373;width: 4px; height: 4px; border-radius: 50%;"></div>
  <div style="height: 17px; margin-left: 6px;">请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</div>
</div>

</div>

    </template>
    
    <script>

    export default {
     
 
      props:{
         
          coinName:{
              type:String,
              required: false,
          },
          withdrawMin:{
              type:String,
              required: false,
          },
        
  
      },
      // eslint-disable-next-line vue/multi-word-component-names
      name: "Tips",
      components: {
      
        
      },
      data() {
        return { };
      },
      computed:{
         
  
  
      },
      mounted(){
    
      },
      methods:{

      
     
    
      }
    };
    </script>
    <style lang="scss" scoped>
    
    </style>
    