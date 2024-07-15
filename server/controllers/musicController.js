import ytdl from "@distube/ytdl-core";

const music = async (req, res) => {

    const url = req.body.url
    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
    res.header("Content-Type", "audio/mpeg");
    res.header("Content-Disposition", `attachment; filename="audio.mp3"`);

    ytdl(url, { format: audioFormat }).pipe(res);

};

export { music }



// const compID = req.body.compID;
//     const worksResponse = await axios.get(`https://api.openopus.org/work/list/composer/${compID}/genre/all.json`);

//     const compName = worksResponse.data.composer.complete_name;
//     const workNames = worksResponse.data.works

//     var titles = []
//     for (let i of workNames) {
//         const searchTerm = `${i.title} ${compName}`
//         const results = await ytstream.search(searchTerm);
//         if (results[0]) {
//             titles.push([i.id, results[0].url, results[0].title, results[0].length_text, results[0].length, compName])
//             console.log(i.id, results[0].url, results[0].title, results[0].length_text, results[0].length, compName)
//         }
//         else {
//             titles.push([i.id, "ERROR", "ERROR", "ERROR", "ERROR", compName])
//             console.log(`ERROR: ${i.id}`)
//         }
//     };

//     res.send(titles)


// ----------------------------------------------------------------------


// import requests
// from datetime import datetime, timezone
// import csv
// import pandas as pd

// # Replace 'your_file.csv' with the path to your CSV file
// file_path = 'markers_rows.csv'

// # Read the CSV file
// df = pd.read_csv(file_path)

// # If needed, strip any leading/trailing spaces from the column names
// df.columns = df.columns.str.strip()

// # Replace 'Column1' and 'Column2' with the actual column names you want to extract
// column_to_extract = 'composerID'

// # Check if the column exists in the DataFrame
// column_array = []
// if column_to_extract in df.columns:
//     # Extract the column and convert to a 1D array
//     column_array = list(df[column_to_extract].to_numpy())
//     # Print the 1D array
// else:
//     print(f"Column '{column_to_extract}' not found in the DataFrame.")
//     print("Available columns are:", df.columns)


// column_array = [a.item() for a in column_array]

// final_arr = []
// for comp_id in sorted([184, 177, 186, 4, 188, 183, 2, 189, 185, 190]):

//     try:
//         #make req to server
//         print(f"requested {comp_id}")
//         r = requests.post(f"http://localhost:3001/api/music", {"compID": comp_id})
//         final_arr.append(r.json())
        
//     except:
//         print(f"error with comp_id {comp_id}")


// with open("yt_links_utf8_missing.csv", 'w', newline='', encoding='utf-8') as file:
//     writer = csv.writer(file)
//     writer.writerow(['work_id', 'yt_link', 'yt_title', 'duration', 'duration_ms', 'composer_name'])  # Header row

//     for works in final_arr:
//         for work in works:
//             try: 
//                 print(work)
//                 writer.writerow([work[0], work[1], work[2], work[3], work[4], work[5]])
//             except:
//                 print("ERROR WRITING")
