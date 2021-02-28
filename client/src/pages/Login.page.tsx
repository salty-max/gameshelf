import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useForm } from 'react-hook-form';

import { AppActions, RootState, useTypedSelector } from '../redux';
import { loadUser, loginUser } from '../redux/modules/user';
import Field from '../components/Field.component';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button.component';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const history = useHistory();
  const { error, authenticated } = useTypedSelector((state) => state.user);
  const dispatch: ThunkDispatch<RootState, unknown, AppActions> = useDispatch();
  const loginAction = (body: FormData) => dispatch(loginUser(body));
  const loadAction = () => dispatch(loadUser());
  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    authenticated && history.push('/dashboard');
  }, [history, authenticated]);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await loginAction({ email, password });
    await loadAction();
  });

  return (
    <main className="bg-gray-lightest h-screen flex items-center">
      {error && console.log(error)}
      <div className="container w-1/2 lg:w-1/3 py-8 mx-auto flex flex-col items-center justify-center bg-white rounded-xxl">
        <h1 className="text-5xl pb-10 text-blue font-title">Gameshelf</h1>
        <form onSubmit={onSubmit}>
          <Field name="email" type="email" label="Email address" register={register} />
          <Field name="password" label="Password" type="password" register={register} />
          <div className="pt-4">
            <Button bgColor="green" type="submit" full rounded text="Login" icon="sign-in-alt" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
