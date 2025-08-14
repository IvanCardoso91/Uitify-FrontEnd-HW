// Returns a Promise that resolves after the specified number of milliseconds.
// also simulates an asynchronous operation with a delay and an optional failure rate.

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function simulate<T>(
  payload: T,
  ms = 600,
  failRate = 0.12
): Promise<T> {
  await delay(ms);
  if (failRate > 0 && Math.random() < failRate) {
    throw new Error("Network error (simulated)");
  }
  return payload;
}
