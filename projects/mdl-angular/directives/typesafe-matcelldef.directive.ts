import { CdkCellDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Directive({
  selector: '[matCellDef]', // same selector as MatCellDef
  standalone: true,
  providers: [{ provide: CdkCellDef, useExisting: TypeSafeMatCellDef }],
})
export class TypeSafeMatCellDef<T> extends MatCellDef {
  // leveraging syntactic-sugar syntax when we use *matCellDef
  @Input() matCellDefDataSource!: T[] | Observable<T[]> | MatTableDataSource<T>;

  // ngTemplateContextGuard flag to help with the Language Service
  static ngTemplateContextGuard<T>(
    dir: TypeSafeMatCellDef<T>,
    ctx: unknown
  ): ctx is { $implicit: T; index: number } {
    return true;
  }
}
