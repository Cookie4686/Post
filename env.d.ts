declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_STRING: string;
    }
  }
}