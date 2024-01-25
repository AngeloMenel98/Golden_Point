declare namespace NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        JWT_SECRET: string;
        JWT_TTL: string;
        DB_HOST: string;
        DB_PORT: string;
        DB_NAME: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        LOG_LEVEL: string;
        DB_TIMEOUT: string;
    }
}
