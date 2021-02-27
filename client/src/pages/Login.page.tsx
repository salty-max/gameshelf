import React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useForm } from 'react-hook-form';

import { AppActions, RootState, useTypedSelector } from '../redux';
import { loginUser } from '../redux/modules/user';
import Field from '../components/Field.component';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button.component';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const history = useHistory();
  const { error } = useTypedSelector((state) => state.user);
  const dispatch: ThunkDispatch<RootState, unknown, AppActions> = useDispatch();
  const login = (body: FormData) => dispatch(loginUser(body));
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await login({ email, password });
    history.push('/games');
  });

  return (
    <main className="bg-gray-lightest h-screen flex items-center">
      <div className="container w-1/2 lg:w-1/3 py-8 mx-auto flex flex-col items-center justify-center bg-white rounded-xxl">
        <h1 className="text-5xl pb-10 text-blue font-title">Gameshelf</h1>
        {error && (
          <span className="text-center bg-red text-white mx-auto px-4 py-2 rounded-xxl opacity-80 absolute top-10">
            {error.message}
          </span>
        )}
        <form onSubmit={onSubmit}>
          <Field name="email" label="Email address" register={register} />
          <Field name="password" label="Password" type="password" register={register} />
          <div className="pt-4">
            <Button bgColor="green" isSubmit full rounded text="Login" icon="sign-in-alt" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
