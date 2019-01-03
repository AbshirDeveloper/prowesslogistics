import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(x: any, search: any): any {
    if(search === undefined || search === null){
      return x;
    }
    return x.filter(function(x){
      return x.name.toLowerCase().includes(search) || x.phone.toLowerCase().includes(search);
    })
  }
  
}