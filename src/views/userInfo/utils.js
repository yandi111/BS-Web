import axios from 'axios'
export function bindAccount(){
   
   axios.post('/app/bsex-user/bind/phone/check'
   ).then(res => {
    console.log(res);
   
   }).catch(e => {
     console.log(e);

   })
}

