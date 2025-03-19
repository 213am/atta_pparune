export const addHypenFunction = (phone: string) => {
  const cleaned = phone.replace(/[^0-9]/g, "");
  return cleaned.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
};
