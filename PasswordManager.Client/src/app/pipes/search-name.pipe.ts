import { Pipe, PipeTransform } from '@angular/core';
import { IPassword } from '../models/password';

@Pipe({
  name: 'searchName',
})
export class SearchNamePipe implements PipeTransform {
  transform(passwords: IPassword[], search: string): IPassword[] {
    if (search.length === 0) return passwords;
    return passwords.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}
