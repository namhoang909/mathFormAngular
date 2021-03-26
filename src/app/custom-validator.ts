import { AbstractControl } from "@angular/forms";

export class CustomValidator {
  // with static it is not necessary to write:
  // const mathValidator = new CustomValidator();
  // mathValidator.addition
  // just CustomValidator.addition()
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const firstNumber = form.value[sourceOne];
      const secondNumber = form.value[sourceTwo];
      
      if(firstNumber + secondNumber === parseInt(sum)) {
        return null;
      };
      
      return {addition: true};
    }
  }
}
