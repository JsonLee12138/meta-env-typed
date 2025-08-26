import fs from 'node:fs';
import path from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EnvTyped } from '../lib/core';

vi.mock('fs');
vi.mock('path');

describe('envTyped', () => {
  const mockLoadEnv = vi.fn();
  const mockOptions = {
    envMode: 'test',
    envDir: '/test/env',
    envPrefix: 'VITE_',
    filePath: '/test/env.d.ts',
    valueInType: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fs.readFileSync).mockReturnValue('{{#each properties}}{{key}}: {{type}};{{/each}}');
    vi.mocked(path.join).mockReturnValue('/test/env/.env');
    vi.mocked(path.resolve).mockReturnValue('/test/tmpl/importMeta.hbs');
  });

  it('should create instance with correct options', () => {
    const envTyped = new EnvTyped({ ...mockOptions, loadEnv: mockLoadEnv });
    expect(envTyped).toBeInstanceOf(EnvTyped);
  });

  it('should generate types with string values when valueInType is false', () => {
    mockLoadEnv.mockReturnValue({
      VITE_API_URL: 'http://localhost:3000',
      VITE_PORT: '3000',
    });

    const envTyped = new EnvTyped({ ...mockOptions, loadEnv: mockLoadEnv });
    envTyped.gen();

    expect(mockLoadEnv).toHaveBeenCalledWith(mockOptions);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should generate types with literal values when valueInType is true', () => {
    mockLoadEnv.mockReturnValue({
      VITE_API_URL: 'http://localhost:3000',
      VITE_DEBUG: 'true',
    });

    const envTyped = new EnvTyped({
      ...mockOptions,
      valueInType: true,
      loadEnv: mockLoadEnv,
    });
    envTyped.gen();

    expect(mockLoadEnv).toHaveBeenCalledWith({ ...mockOptions, valueInType: true });
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should parse JSON values correctly', () => {
    mockLoadEnv.mockReturnValue({
      VITE_CONFIG: '{"debug": true, "port": 3000}',
    });

    const envTyped = new EnvTyped({ ...mockOptions, loadEnv: mockLoadEnv });
    envTyped.gen();

    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should handle JSON parse errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockLoadEnv.mockReturnValue({
      VITE_INVALID_JSON: '{invalid json',
    });

    const envTyped = new EnvTyped({ ...mockOptions, loadEnv: mockLoadEnv });
    envTyped.gen();

    expect(consoleSpy).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should only process own properties', () => {
    const mockObj = Object.create({ inherited: 'value' });
    mockObj.VITE_OWN = 'own-value';
    mockLoadEnv.mockReturnValue(mockObj);

    const envTyped = new EnvTyped({ ...mockOptions, loadEnv: mockLoadEnv });
    envTyped.gen();

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});
