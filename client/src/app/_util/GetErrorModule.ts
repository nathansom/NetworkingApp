export default function GetErrorModule(this: any, name: string, correction: string | null = null) {
  const errorsProp = this.ngControl.control?.errors;

  if (errorsProp !== null && errorsProp !== undefined && correction !== null) {
    if (
      errorsProp[name] !== undefined &&
      errorsProp[name][correction] !== undefined
    ) {
      return errorsProp[name][correction];
    }
  }
  if (errorsProp !== null && errorsProp !== undefined && correction === null) {
    return errorsProp[name];
  }
  return null;
}