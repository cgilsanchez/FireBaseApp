import { PasswordVisibilityPipe } from './password-visibility.pipe';

describe('PasswordVisibilityPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordVisibilityPipe();
    expect(pipe).toBeTruthy();
  });
});
