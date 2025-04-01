
<template>
 <div style="margin-top: 16px;">
<div class="flex ic" style="height: 17px;color: #737373;">
  <div style="background-color: #737373;width: 4px; height: 4px; border-radius: 50%;"></div>
  <div style="height: 17px; margin-left: 6px;">请勿向上述地址充值任何非USDT资产，否则资产将不可找回。</div>
</div>
<div class="flex ic" style="height: 17px;color: #737373; margin-top: 3px;">
  <div style="background-color: #737373;width: 4px; height: 4px; border-radius: 50%;"></div>
  <div style="height: 17px; margin-left: 6px;">您充值至上述地址后，需要整个网络节点的确认， {{confirmingThreshold}}次网络确认后到账</div>
  <!-- ，30次网络确认后可提币。 -->
</div>
<div class="flex ic" style="height: 17px;color: #737373;margin-top: 3px;">
  <div style="background-color: #737373;width: 4px; height: 4px; border-radius: 50%;"></div>
  <div style="height: 17px; margin-left: 6px;">最小充值金额: {{rechargeMin}} {{ coinNameInfo }} 。 小于最小金额的充值将不会上账且无法退回。</div>
</div>
<div class="flex ic" style="height: 17px;color: #737373;margin-top: 3px;">
  <div style="background-color: #737373;width: 4px; height: 4px; border-radius: 50%;"></div>
  <div style="height: 17px; margin-left: 6px;">您的充值地址不会经常改变，可以重复充值;如有更改，我们会尽量通过网站公告或邮件通知您。</div>
</div>
<div class="flex ic" style="height: 17px;color: #737373;margin-top: 3px;">
  <div style="background-color: #737373;width: 4px; height: 4px; border-radius: 50%;"></div>
  <div style="height: 17px; margin-left: 6px;">请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</div>
</div>
<div class="flex ic" style="height: 17px;color: #737373;margin-top: 3px;">
  <div style="height: 17px;">提示：出金需要完成首次入金后才可以进行，但没有币种限制。</div>
</div>

</div>

    </template>
    
    <script>

    export default {
     
 
     props:{
      rechargeMin:{
        type: String,
        required: false,
      },
      confirmingThreshold:{
        type: String,
        required: false,
      },
      coinNameInfo:{
        type: String,
        required: false,
      }

  
 
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
    