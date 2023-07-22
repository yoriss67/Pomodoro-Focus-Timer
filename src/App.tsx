import { useState, useEffect } from 'react';
import Timer from './Timer';
import List from './List';
import Video from './Video';

// interface ImageData {
//   urls: {
//     full: string;
//   }
// }

// interface ViteEnv {
//   VITE_APP_UNSPLASH_ACCESS_KEY?: string;
// }
interface UnsplashResponse {
  urls: {
    full: string;
  };
}



function App() {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/random?query=nature&client_id=${import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY}`)

      .then(response => response.json() as Promise<UnsplashResponse>)
      .then(data => setBgImage(data.urls.full))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='app'>
      
      <div className="bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <h1 className="title">Pomodoro Focus Timer🕊️⌛</h1>
      <Timer />
      <List />
      <Video />
    </div>
  );
}
export default App;
