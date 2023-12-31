import {useState, useEffect, useRef} from 'react';
import {db} from './firebaseConfig.js';
import {collection, getDocs, addDoc} from 'firebase/firestore/lite';

const Home = () => {

    const [items, setItems] = useState([]);
    const inputElement = useRef(null);
    const yearElement = useRef(null);

    const getYears = () => {
        var years = [];
        var start = new Date().getFullYear();

        for (var i = start; i >= start - 20; i--){
            years.push(i);
        }
        return years;
    }
  
    useEffect(() => {
      
      getCities(db).then((e) => {
        setItems(e);
      })
  
    }, [])
  
    async function getCities(db) {
  
      const col = collection(db, 'firstdb');
      const snapshot = await getDocs(col);
      const list = snapshot.docs.map(doc => 
        doc.data().text
      );
  
      return list;
  
    }
  
    async function handleInput(){
    
      try {
        if (inputElement.current.value.trim().length !== 0){
        const col = collection(db, "firstdb");
        await addDoc(col, {
          text: inputElement.current.value,
          year: yearElement.current.value,
        });
      }
        
      } catch (e) {
        console.log("Error: " + e);
      }
  
    }

    return (
        <div className="home-wrapper">
        <div className="full-content">
            <div className="input-row">
                <select ref={yearElement} name="year" onChange={() => {console.log(yearElement.current.value)}}>
                    {getYears().map((e,i) => {
                        return (<option key={i} value={e.toString()}>{e.toString()}</option>)
                    })}
                </select>
            </div>
          <div className="input-row">
            <input ref={inputElement} type="text"/>
            <div className="submit" onClick={() => {handleInput().then(() => {getCities(db);})}}>+</div>
          </div>
          <div className='holder'>
            {items.map((e, i) => {
              return (<a href={`/${e}`} key={i} className="card">{e}</a>)
            })}
          </div>
        </div>
      </div>
    )

}

export default Home;