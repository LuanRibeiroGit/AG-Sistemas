import { Reflector } from '@nestjs/core';
import { RolesGuard } from './role.guard';

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;

    beforeEach(() => {
        reflector = {
            get: jest.fn(),
        } as any;
        guard = new RolesGuard(reflector);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });
});
