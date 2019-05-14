import axios from 'axios';

const mc = axios.create({
    baseURL: 'http://127.0.0.1:8099',
    timeout: 3000,
});

mc.interceptors.response.use((response) => {
    return response.data;
})

export async function getWhiteList(): Promise<{
    players: string[]
}> {
    const data = await mc.get('/whitelist') as any;
    data.players = JSON.parse(data.players);
    return data;
}

export async function delWhiteName(name: string) {
    return mc.delete(`/whitelist/${name}`) as any;
}

export async function addWhiteName(name: string) {
    return mc.put(`/whitelist`, {
        name
    }) as any;
}

export async function dispatchCommand(cmd: string) {
    return mc.post(`/server/dispatchCommand`, {
        cmd
    }) as any;
}

export async function getServerInfo() {
    return mc.get(`/server/serverinfo`) as any;
}