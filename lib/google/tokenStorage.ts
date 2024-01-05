const TOKEN_STORAGE_KEY = 'refresh_token';

export const saveRefreshToken = (refreshToken: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, refreshToken);
};

export const loadRefreshToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const clearRefreshToken = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
