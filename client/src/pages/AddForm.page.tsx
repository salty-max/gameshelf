import React, { FC } from 'react';
import GameForm from '../components/Forms/GameForm.component';

const AddForm: FC = () => {
  return (
    <section className="p-6 xl:w-2/3">
      <div className="pt-4 pb-8 flex items-center justify-between">
        <h2 className="font-semibold text-3xl">Add a game</h2>
      </div>
      <GameForm />
    </section>
  );
};

export default AddForm;
