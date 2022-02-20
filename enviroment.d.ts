declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            guildId: string;
        }
    }
}

export {}