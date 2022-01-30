export default class APICacheService {

    private getLocalStorage(key: string) {
        return localStorage.getItem(key);
    }

    setLocalStorage(key: string, response: string) {
        localStorage.setItem(key, response);
    }

    async makeCachedRequest(url: string, key: string = 'results') {
        const data = this.getLocalStorage(url);
        if (data) {
            const parsedData = JSON.parse(data);
            if (parsedData.length) {
                return JSON.parse(data);
            }
        }
        try {
            const results = await this.makeApiRequest(url, key);
            this.setLocalStorage(url, JSON.stringify(results));
            return results;
        } catch (error) {
            console.error(error);
        }
    }

    async makeApiRequest(url: string, key: string) {
        try {
            const response = await fetch(url);
            const responseData = await response.json();
            return responseData[key];
        } catch (error) {
            console.error(error);
        }
    }
}