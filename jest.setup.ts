// jest.setup.ts
import '@testing-library/jest-dom'

// Optional: mock next/navigation if using useParams, etc.
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'mock-id' }),
}))