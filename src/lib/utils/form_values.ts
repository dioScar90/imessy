export const getValuesFromForm = (form: HTMLFormElement) => {
  const formData = new FormData(form)
  const values: { [value: string]: string } = {}

  for (const [key, value] of formData) {
    values[key] = value.toString().trim()
  }

  return values
}
