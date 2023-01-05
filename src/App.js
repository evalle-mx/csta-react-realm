import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import './App.css';

function App() {

  const [chats, setChats] = useState([]);

  const getData = async() => {
    const app = new Realm.App({ id: "intercom-0-siqce" });
    const credentials = Realm.Credentials.anonymous();

    try {
      const session = await app.logIn(credentials);
      //after login the Realm-App, save the request in a temporal object
      const result = await session.functions.getAllChats(); //last part is the Function name
      //set the value of chats variable with setChats
      setChats(result);
    } catch(err) {
      console.error("Failed to log in", err);
    }
  };

  //Hook function to getData
  useEffect( () => {
    getData()
  }, []);

  return (
    <div className="App">
      {chats.map( (data, key) => {
          return(
            <>
            <ul>
              <li ><b>{data.number}</b>: {data.title}</li>
            </ul>
            </>
          );
        } )}
    </div>
  );
}

export default App;
