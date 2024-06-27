import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/homepage.module.css";
import BirthdayCard from "../components/home/BirthdayCard";

function Home(props) {

  const [composersBirthday, setComposerBirthday] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/api/birthday")
      .then(res => {
        setComposerBirthday(res.data)
      }).catch(err => {

      })
  }, [])

  return (
    <div className={styles.homeBody}>

      <div>
        <h2>Upcoming Birthdays</h2>
        <div>
          {/* {composersBirthday.map((composer, index) => {
            return <BirthdayCard key={index} composer={composer} />
          })} */}
          <BirthdayCard composer={composersBirthday[0]} />
        </div>
      </div>
      <div>
      </div>

    </div>
  );
}

export default Home;
