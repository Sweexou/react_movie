import { useEffect, useState } from "react";

export function UseFetch(url: string){
  const[data, setData]=useState(null);
  useEffect(()=>{ 
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, [url]);
  return data;
}