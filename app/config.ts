export  default {
    mysql: {
        host: 'mysql.haozi.local',  // 内网地址  ==
        username: 'crafttown',
        password: 'Minecraft@kangna.io',
        port: 3306,
        database: 'craftTown'
    },
    redis: {
        url: 'redis://redis.haozi.local', // 内网地址  ==
        prefix: '@crafttown:',
    },
    managerGroup: 782490531,
    gameGroup: 573284146,
    cq: {
        server: {
            ip: '192.168.50.126', // craft.haozi.local
            port: ''
        },
        client: {
            ip: '192.168.50.115',
            port: ''
        }
    }
}