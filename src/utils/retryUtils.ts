import type { PostgrestResponse, PostgrestSingleResponse, PostgrestError } from '@supabase/supabase-js';

interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
};

export async function withRetry<T>(
  operation: () => Promise<PostgrestResponse<T> | PostgrestSingleResponse<T>>,
  options: RetryOptions = {}
): Promise<PostgrestResponse<T> | PostgrestSingleResponse<T>> {
  const {
    maxAttempts,
    initialDelay,
    maxDelay,
    backoffFactor,
  } = { ...defaultOptions, ...options };

  let lastError: PostgrestError = {
    message: '',
    details: '',
    hint: '',
    code: '',
    name: 'PostgrestError'
  };
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await operation();
      return result;
    } catch (error) {
      lastError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: '',
        hint: `Failed attempt ${attempt} of ${maxAttempts}`,
        code: 'RETRY_FAILED',
        name: 'PostgrestError'
      };
      
      // If this was our last attempt, break
      if (attempt === maxAttempts) break;

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Increase delay for next attempt, but don't exceed maxDelay
      delay = Math.min(delay * backoffFactor, maxDelay);
      
      console.warn(`Retrying Supabase request (attempt ${attempt + 1}/${maxAttempts})...`);
    }
  }

  // Return error response if all retries failed
  return {
    data: null,
    error: lastError,
    count: null,
    status: 500,
    statusText: 'ERROR'
  };
} 