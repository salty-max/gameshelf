import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useForm } from 'react-hook-form';

import { AppActions, RootState, useTypedSelector } from '../redux';
import { loadUser, registerUser } from '../redux/modules/user';
import Field from '../components/Field.component';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button.component';

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {
  const history = useHistory();
  const { error, authenticated } = useTypedSelector((state) => state.user);
  const dispatch: ThunkDispatch<RootState, unknown, AppActions> = useDispatch();
  const registerAction = (body: object) => dispatch(registerUser(body));
  const loadAction = () => dispatch(loadUser());
  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    authenticated && history.push('/dashboard');
  }, [history, authenticated]);

  const onSubmit = handleSubmit(async ({ username, email, password, passwordConfirm }) => {
    if (password === passwordConfirm) {
      await registerAction({ username, email, password });
      await loadAction();
    }
  });

  return (
    <main className="bg-gray-lightest h-screen flex items-center">
      {error && console.log(error)}
      <div className="container w-1/2 lg:w-1/3 py-8 mx-auto flex flex-col items-center justify-center bg-white rounded-xxl">
        <h1 className="text-5xl pb-10 text-blue font-title">Gameshelf</h1>
        <form onSubmit={onSubmit}>
          <Field name="username" label="Username" register={register} />
          <Field name="email" label="Email address" type="email" register={register} />
          <Field name="password" label="Password" type="password" register={register} />
          <Field
            name="passwordConfirm"
            label="Confirm password"
            type="password"
            register={register}
          />
          <div className="pt-4">
            <Button bgColor="green" type="submit" full rounded text="Register" icon="sign-in-alt" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
