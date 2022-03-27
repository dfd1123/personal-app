import { setAuth } from "@/store/auth/auth";
import { ConstructorParamsType } from "./types/Service";

class UserService {
    #api;
    #cookie;
    #dispatch;
  
    constructor({ api, cookie, dispatch }: ConstructorParamsType) {
      this.#api = api;
      this.#cookie = cookie;
      this.#dispatch = dispatch;
    }

    sendSmsVerify(tel: number | string){
        return this.#api.post('/auth/signin/sms', {tel});
    }

    reSendSmsVerify(tel: number | string){
        return this.#api.post('/auth/signin/sms/resend', {tel});
    }

    async smsVerifyConfirm({tel, code} : {tel: number | string, code: number | string}){
        const {authToken, refreshToken, wrongCode} = await this.#api.post('/auth/signin/sms/verify', {tel, code});

        if(authToken){
            this.#cookie.setAccessToken(authToken, refreshToken);
            await this.getMyInfo();
        }

        return {authToken, refreshToken, wrongCode};
    }

    async getMyInfo(){
        const authToken = this.#cookie.getAccessToken();
        if(authToken){
            const {user} = await this.#api.get('/users/me');
            this.#dispatch(setAuth({user}));
        }else{
            this.logout();
        }
    }

    logout(){
        this.#dispatch(setAuth({}));
        this.#cookie.removeAccessToken();
    }
}

export default UserService;