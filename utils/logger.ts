type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: unknown;
}

class Logger {
    private isDevelopment = __DEV__;

    private createLogEntry(level: LogLevel, message: string, data?: unknown): LogEntry {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
        };
    }

    private log(level: LogLevel, message: string, data?: unknown): void {
        const logEntry = this.createLogEntry(level, message, data);

        if (this.isDevelopment) {
            switch (level) {
                case 'info':
                    console.log(`ℹ️ ${message}`, data ?? '');
                    break;
                case 'warn':
                    console.warn(`⚠️ ${message}`, data ?? '');
                    break;
                case 'error':
                    console.error(`🔴 ${message}`, data ?? '');
                    break;
                case 'debug':
                    console.debug(`🔧 ${message}`, data ?? '');
                    break;
            }
        } else {
            // Тут можна додати відправку логів на сервер
            // Наприклад, використовуючи Sentry або інший сервіс
            this.sendToAnalytics(logEntry);
        }
    }

    private sendToAnalytics(logEntry: LogEntry): void {
        console.log('Sending log entry to analytics:', logEntry);
    }

    info(message: string, data?: unknown): void {
        this.log('info', message, data);
    }

    warn(message: string, data?: unknown): void {
        this.log('warn', message, data);
    }

    error(message: string, error?: Error | unknown): void {
        this.log('error', message, {
            error: error instanceof Error ? {
                message: error.message,
                stack: error.stack,
                name: error.name,
            } : error,
        });
    }

    debug(message: string, data?: unknown): void {
        if (this.isDevelopment) {
            this.log('debug', message, data);
        }
    }
}

export const logger = new Logger();
