import { addMinutes, format, parseISO } from 'date-fns';

export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const normalize = (value: string) => {
  return value.replace(/\D/g, '');
};

export const formatDate = (date: string) => {
  const parsedISODate = parseISO(date);

  return format(
    addMinutes(parsedISODate, parsedISODate.getTimezoneOffset()),
    'dd/MM/yyyy',
  );
};
