import { parse } from 'date-fns';
import * as Yup from 'yup';

export type LoginForm = Yup.InferType<typeof LoginSchema>;

export const LoginSchema = Yup.object({
  email: Yup.string()
    .required('Preencha os campos necessários')
    .email('E-mail Inválido')
    .trim(),
  password: Yup.string()
    .min(8, 'Insira uma senha válida')
    .required('Preencha os campos necessários')
    .trim(),
});

export type SignupForm = Yup.InferType<typeof SignupSchema>;

export const SignupSchema = Yup.object({
  name: Yup.string().required('Campo Obrigatório'),
  email: Yup.string()
    .required('Preencha os campos necessários')
    .email('E-mail Inválido'),

  password: Yup.string()
    .min(8, 'Insira uma senha válida')
    .required('Preencha os campos necessários')
    .trim(),

  cpf: Yup.string().required('Campo Obrigatório'),
  birth_date: Yup.date()
    .transform((value, originalValue) => {
      try {
        const NewDate = parse(originalValue, 'dd/MM/yyyy', new Date());
        return NewDate;
      } catch (error) {
        return null;
      }
    })
    .typeError('Data de nascimento inválida')
    .min('01/01/1900', 'Data de nascimento inválida')
    .required('Data de nascimento obrigatória'),
});

export type Forgot = Yup.InferType<typeof ForgotPasswordSchema>;

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required('Preencha os campos necessários')
    .email('E-mail Inválido')
    .trim(),
});

export type Transactions = Yup.InferType<typeof TransactionsSchema>;

export const TransactionsSchema = Yup.object({
  title: Yup.string().required('Preencha os campos necessários').trim(),
  value: Yup.string(),

  category: Yup.string(),

  date: Yup.date()
    .transform((value, originalValue) => {
      try {
        const NewDate = parse(originalValue, 'dd/MM/yyyy', new Date());
        return NewDate;
      } catch (error) {
        return null;
      }
    })
    .typeError('Data de nascimento inválida')
    .min('01/01/1900', 'Data de nascimento inválida')
    .required('Data obrigatória'),
});
