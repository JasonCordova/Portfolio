import { useParams } from "react-router-dom";
import { collection, collectionGroup, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getFirestore, Firestore } from "firebase/firestore";


const Project = (props) => {

    let {id} = useParams();
    const [item, setItem] = useState([]);

    async function getInformation(){

        const db = getFirestore();
        const col = collection(db, "firstdb");
        const q = query(col, where("text", "==", id.toString()));
        const snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
            const data = doc;
            setItem(data.data());
            console.log(data.data());
        })

    }

    useEffect(() => {

        getInformation();

    }, []);

    return (
        <>
            <div className="fs-holder">
            <div className="project">
                <div className="project-title">{item.text}</div>
                <div className="project-col">
                    <div className="col-title">Year</div>
                    <div className="col-value">{item.year}</div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Project;