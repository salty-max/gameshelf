import React, { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Button from '../shared/Button.component';
import Field from '../shared/Field.component';
import Select from '../shared/Select.component';
import { AppActions, RootState, useTypedSelector } from '../../redux';
import { fetchGenresAsync, fetchPlatformsAsync, IGame } from '../../redux/modules/games';
import dayjs from 'dayjs';

interface IGameFormProps {
  game?: IGame;
}

interface IFormData {
  name: string;
  platform: {
    value: string;
    label: string;
  };
  genres: [
    {
      value: string;
      label: string;
    },
  ];
  developers: string;
  editors: string;
  completed: boolean;
  platinum: boolean;
  nowPlaying: boolean;
  physical: boolean;
  releaseDate: Date;
  cover: string;
}

const GameForm: FC<IGameFormProps> = ({ game }) => {
  const platformValue = game && { value: game.platform._id, label: game.platform.name };
  const genresgame = game && game.genres.map((genre) => ({ value: genre._id, label: genre.name }));
  const { platforms, genres } = useTypedSelector((state) => state.games);
  const dispatch: ThunkDispatch<RootState, unknown, AppActions> = useDispatch();
  const { register, control, handleSubmit } = useForm<IFormData>({
    defaultValues: game
      ? {
          ...game,
          platform: platformValue,
          genres: genresgame,
          editors: game.editors.join(','),
          developers: game.developers.join(','),
          releaseDate: dayjs(game.releaseDate).format('YYYY/MM/DD'),
        }
      : {},
  });
  const fetchPlatforms = () => dispatch(fetchPlatformsAsync());
  const fetchGenres = () => dispatch(fetchGenresAsync());

  useEffect(() => {
    fetchPlatforms();
    fetchGenres();
  }, []);

  const genresOptions = useMemo(() => {
    return genres ? genres.map((genre) => ({ value: genre._id, label: genre.name })) : [];
  }, [genres]);

  const platformsOptions = useMemo(() => {
    return platforms
      ? platforms.map((platform) => ({ value: platform._id, label: platform.name }))
      : [];
  }, [platforms]);

  const onSubmit = handleSubmit(async (formData: IFormData) => {
    const body = {
      name: formData.name,
      platform: formData.platform?.value,
      genres: formData.genres?.map((genre) => genre.value),
      editors: formData.editors.split(','),
      developers: formData.developers.split(','),
      completed: formData.completed || false,
      platinum: formData.platinum || false,
      nowPlaying: formData.nowPlaying || false,
      physical: formData.physical || false,
      releaseDate: dayjs(formData.releaseDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      cover: formData.cover,
    };
    console.log({ body });
  });

  return (
    <>
      {genres && platforms && (
        <form onSubmit={onSubmit}>
          <Field name="name" label="Name" register={register} required />
          <div className="grid grid-cols-2 gap-x-8">
            <Select name="platform" label="Platform" items={platformsOptions} control={control} />
            <Select name="genres" label="Genres" items={genresOptions} control={control} isMulti />
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <Field
              name="developers"
              label="Developers"
              register={register}
              hint="I.E. Japan Studio,From Software"
            />
            <Field
              name="editors"
              label="Editors"
              register={register}
              hint="I.E. SIE,Bandai Namco"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            <Field type="checkbox" name="completed" label="Completed" register={register} />
            <Field type="checkbox" name="platinum" label="All trophies" register={register} />
            <Field
              type="checkbox"
              name="nowPlaying"
              label="Currently playing"
              register={register}
            />
            <Field type="checkbox" name="physical" label="Physical version" register={register} />
          </div>
          <Field name="releaseDate" label="Release date" register={register} />
          <Field name="cover" label="Cover URL" register={register} />
          <Button type="submit" big bgColor="green" text="Save" icon="save" />
        </form>
      )}
    </>
  );
};

export default GameForm;
