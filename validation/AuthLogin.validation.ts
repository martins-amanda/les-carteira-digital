import { parse } from 'date-fns';
import * as Yup from 'yup';

export type LoginForm = Yup.InferType<typeof LoginSchema>;

export const LoginSchema = Yup.object({
  email: Yup.string()
    .required('Campo obrigatório')
    .email('E-mail Inválido')
    .trim(),
  password: Yup.string()
    .min(8, 'Insira uma senha válida')
    .required('Campo obrigatório')
    .trim(),
});

export type SignupForm = Yup.InferType<typeof SignupSchema>;

export const SignupSchema = Yup.object({
  name: Yup.string().required('Campo Obrigatório'),
  email: Yup.string().required('Campo obrigatório').email('E-mail Inválido'),

  password: Yup.string()
    .min(8, 'Insira uma senha válida')
    .required('Campo obrigatório')
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
    .required('Campo obrigatório')
    .email('E-mail Inválido')
    .trim(),
});

export type Transactions = Yup.InferType<typeof TransactionsSchema>;

export const TransactionsSchema = Yup.object({
  title: Yup.string().required('Campo obrigatório').trim(),
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
    .typeError('Data inválida')
    .min('01/01/1900', 'Data inválida')
    .required('Data obrigatória'),
});

export type Goal = Yup.InferType<typeof GoalSchema>;

export const GoalSchema = Yup.object({
  title: Yup.string().required('Campo obrigatório').trim(),
  value: Yup.string().required('Campo obrigatório'),

  final_date: Yup.date()
    .transform((value, originalValue) => {
      try {
        const NewDate = parse(originalValue, 'dd/MM/yyyy', new Date());
        return NewDate;
      } catch (error) {
        return null;
      }
    })
    .typeError('Data inválida')
    .min('01/01/1900', 'Data inválida')
    .required('Data obrigatória'),
});

export type GoalUpdate = Yup.InferType<typeof GoalUpdateSchema>;

export const GoalUpdateSchema = Yup.object({
  title: Yup.string().required('Campo obrigatório').trim(),
  value: Yup.string().required('Campo obrigatório'),
  total_raised: Yup.string().required('Campo obrigatório'),
  final_date: Yup.date()
    .transform((value, originalValue) => {
      try {
        const NewDate = parse(originalValue, 'dd/MM/yyyy', new Date());
        return NewDate;
      } catch (error) {
        return null;
      }
    })
    .typeError('Data inválida')
    .min('01/01/1900', 'Data inválida')
    .required('Data obrigatória'),
});
