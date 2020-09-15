import React, { useEffect, useState } from 'react';
import { GalleryContext } from './GalleryContext';

const PREFIX = 'image-fetch-';

export default function useLocalStorage(key, initialValue) {
  const [values, setValues] = React.useContext(GalleryContext);
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    }
    return initialValue;
  });

  const setTheValue = (fromValue) => {
    try {
      localStorage.setItem(prefixedKey, JSON.stringify(fromValue));
      setValues({ ...values, storage: Object.entries({ ...localStorage }) });
    } catch (error) {
      console.log(error);
    }
  };

  const getKey = (fromKey) => {
    // console.log(localStorage.key(PREFIX + fromKey));
    return localStorage.key(PREFIX + fromKey);
  };

  const removeValue = (fromKey) => {
    try {
      window.localStorage.removeItem(PREFIX + fromKey);
      setValues({ ...values, storage: Object.entries({ ...localStorage }) });
    } catch (err) {
      console.error(err);
    }
  };

  return [value, setTheValue, getKey, removeValue];
}