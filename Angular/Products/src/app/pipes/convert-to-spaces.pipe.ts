import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let result: string = value;
    for (const arg of args){
      result = value.replace(arg, ' ');
    }
    return result;
  }

}
