import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const fetchSuperHeroes = () =>
   axios.get('http://localhost:4000/superheroes')
  // request({ url: '/superheroes' });
export const useSuperHeroesData = (onSuccess, onError) => useQuery('super-heroes', fetchSuperHeroes, {
  onSuccess,
  onError,
});

const addsignin = async (data) => {
  const response = await axios.post('http://127.0.0.1:8000/api/user/login', data);
  console.log(response, 'response');
  localStorage.setItem('token', response.data.access_token);
  if (response.status === 200) {
    localStorage.setItem('token', response.data.access_token);
  }
};

// request({ url: '/superheroes', method: 'post', data: hero });
export const useAddSigninData = () => useMutation(addsignin);


