declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      // Додавайте інші змінні оточення тут
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

// Це потрібно для того, щоб файл розглядався як модуль
export {};
