import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordVisibility'
  
})
export class PasswordVisibilityPipe implements PipeTransform {
  transform(isVisible: boolean): string {
    return isVisible ? 'text' : 'password';
  }
}
