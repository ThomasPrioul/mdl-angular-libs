import { FormControl, FormGroup } from '@angular/forms';

/** Représente un type qui est un FormGroup respectant les types d'un objet basique, en prenant en compte les champs optionnels. */
export type FormGroupOf<Type> = FormGroup<
  {
    [Property in keyof Type as undefined extends Type[Property] ? Property : never]-?: FormControl<
      Type[Property] | undefined
    >;
  } & {
    [Property in keyof Type as undefined extends Type[Property] ? never : Property]: FormControl<
      Type[Property]
    >;
  }
>;
