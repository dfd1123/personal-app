import Cookies from 'js-cookie';

class CookieService {
    #cookies = Cookies;
    
    getAccessToken(){
        return this.#cookies.get('gateAccessToken');
    }

    getRefreshToken(){
        return this.#cookies.get('gateRefreshToken');
    }

    setAccessToken(accessToken : string, refreshToken?: string){
        this.#cookies.set('gateAccessToken', accessToken, {expires: 30});

        if(refreshToken){
            this.#cookies.set('gateRefreshToken', accessToken, {expires: 30});
        }
    }

    removeAccessToken(){
        this.#cookies.remove('gateAccessToken');
        this.#cookies.remove('gateRefreshToken');
    }

    getHitCnt(key : 'notice' | 'ref', id: number | string){
        const exist = this.#cookies.get(`${key}-${id}`);
        return Boolean(exist);
    }

    setHitCnt(key : 'notice' | 'ref', id: number | string){
        this.#cookies.set(`${key}-${id}`, '1', {expires: 1});
    }

}

export default CookieService;