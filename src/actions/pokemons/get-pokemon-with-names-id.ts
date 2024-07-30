import { pokeApi } from '@/src/config/api/pokeApi';

export const getPokemonsNamesWithId = async () => {
  const url = '/pokemon?limit=1000';
  const { data } = await pokeApi.get(url);

  return data.results.map((info: any) => ({
    id: Number(info.url.split('/')[6]),
    name: info.name,
  }));
};
