import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterLoads'
  })
  export class FilterLoadsPipe implements PipeTransform {
  
    transform(x: any, search: any): any {
      if(search === undefined || search === null){
        return x;
      }
      return x.filter(function(x){
        return x.driver.toLowerCase().includes(search) || x.ref_id.includes(search);
      })
    }
    
  }