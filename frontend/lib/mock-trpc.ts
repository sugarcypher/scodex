// Mock TRPC router to prevent import errors
// This allows the app to load without the actual backend

export type AppRouter = {
  // Add mock endpoints as needed
  example: {
    query: () => Promise<string>;
  };
};

// Mock implementation
export const mockTrpcClient = {
  example: {
    query: async () => "Mock response from Sugar Codex backend"
  }
};
