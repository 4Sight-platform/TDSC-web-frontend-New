/**
 * Frontend Tracing and Logging Service
 *
 * Provides structured logging and performance monitoring for the React frontend.
 */

interface TraceContext {
  requestId: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
}

interface PerformanceMetric {
  operation: string;
  duration: number;
  timestamp: string;
  requestId?: string;
}

class FrontendTracer {
  private requestId: string;
  private performanceMetrics: PerformanceMetric[] = [];
  private isDevelopment: boolean;

  constructor() {
    this.requestId = this.generateRequestId();
    this.isDevelopment = import.meta.env.DEV;
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatLog(
    level: string,
    message: string,
    context?: Record<string, any>
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level}] [${this.requestId}] ${message}${contextStr}`;
  }

  /**
   * Log an information message
   */
  info(message: string, context?: Record<string, any>): void {
    const log = this.formatLog('INFO', message, context);
    if (this.isDevelopment) {
      console.log(log);
    } else {
      console.log(log);
    }
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, any>): void {
    const log = this.formatLog('WARN', message, context);
    console.warn(log);
  }

  /**
   * Log an error message
   */
  error(message: string, error?: Error, context?: Record<string, any>): void {
    const errorContext = {
      ...(error && {
        errorMessage: error.message,
        errorStack: error.stack,
      }),
      ...context,
    };
    const log = this.formatLog('ERROR', message, errorContext);
    console.error(log);
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, context?: Record<string, any>): void {
    if (this.isDevelopment) {
      const log = this.formatLog('DEBUG', message, context);
      console.debug(log);
    }
  }

  /**
   * Log API request
   */
  logApiRequest(method: string, url: string, context?: Record<string, any>): void {
    this.info(`API Request: ${method} ${url}`, {
      requestId: this.requestId,
      ...context,
    });
  }

  /**
   * Log API response
   */
  logApiResponse(
    method: string,
    url: string,
    status: number,
    duration: number,
    context?: Record<string, any>
  ): void {
    this.info(`API Response: ${method} ${url} (${status}) - ${duration.toFixed(2)}ms`, {
      requestId: this.requestId,
      status,
      duration,
      ...context,
    });
  }

  /**
   * Log API error
   */
  logApiError(
    method: string,
    url: string,
    error: Error,
    context?: Record<string, any>
  ): void {
    this.error(`API Error: ${method} ${url}`, error, {
      requestId: this.requestId,
      ...context,
    });
  }

  /**
   * Track operation performance
   */
  startOperation(operation: string): () => void {
    const startTime = performance.now();

    return () => {
      const duration = performance.now() - startTime;
      const metric: PerformanceMetric = {
        operation,
        duration,
        timestamp: new Date().toISOString(),
        requestId: this.requestId,
      };

      this.performanceMetrics.push(metric);
      this.debug(`Operation Completed: ${operation}`, { duration: `${duration.toFixed(2)}ms` });
    };
  }

  /**
   * Log authentication event
   */
  logAuthEvent(event: string, user?: string, context?: Record<string, any>): void {
    this.info(`[Auth] ${event}`, {
      requestId: this.requestId,
      user,
      ...context,
    });
  }

  /**
   * Log engagement event (votes, comments)
   */
  logEngagementEvent(
    event: string,
    postSlug: string,
    context?: Record<string, any>
  ): void {
    this.info(`[Engagement] ${event} on ${postSlug}`, {
      requestId: this.requestId,
      postSlug,
      ...context,
    });
  }

  /**
   * Get current request ID
   */
  getRequestId(): string {
    return this.requestId;
  }

  /**
   * Get all performance metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.performanceMetrics];
  }

  /**
   * Clear metrics
   */
  clearMetrics(): void {
    this.performanceMetrics = [];
  }

  /**
   * Get average performance for an operation
   */
  getAveragePerformance(operation: string): number | null {
    const metrics = this.performanceMetrics.filter((m) => m.operation === operation);
    if (metrics.length === 0) return null;

    const sum = metrics.reduce((acc, m) => acc + m.duration, 0);
    return sum / metrics.length;
  }

  /**
   * Reset tracer (e.g., when starting a new page/session)
   */
  reset(): void {
    this.requestId = this.generateRequestId();
    this.performanceMetrics = [];
  }
}

// Create global tracer instance
export const tracer = new FrontendTracer();

// Export tracer for use throughout the app
export default tracer;
