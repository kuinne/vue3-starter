export const timeout = <T>(data: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 300);
  });
