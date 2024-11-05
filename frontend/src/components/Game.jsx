import { useState, useEffect } from "react";
import axios from "axios";
import { MY_URL } from '../../../../settings/settings.ts'
import { XMLParser } from "fast-xml-parser";
const options = {
    ignoreAttributes: false
};
const parser = new XMLParser(options)

const Game = () => {
    const [games, setGames] = useState([])
    const [xml, setXml] = useState();

    useEffect(() => {
        fetchXML()


    }, []);

    const getGame = async () => {
        try {
            // const response = await axios.get(`${MY_URL}/games/all`,)
            // const response = await axios.get(`https://bgg-json.azurewebsites.net/collection/edwalter`,)
            const response = await axios.get(`https://bgg-json.azurewebsites.net/collection/sergeyfru`,)
            console.log(response.data);
            setGames(response.data)
        } catch (error) {
            console.log(error);
        }

    }

    const createMyDB = async () => {

        let count = 0

        for (const game of games) {
            await new Promise(resolve => setTimeout(() => {
                console.log(game);
                resolve();
            }, 0));


            // If you want to perform the axios request:
            const plusGame = await axios.post(`${import.meta.env.VITE_API_URL}/games/savinggames`,
                { game },
                { withCredentials: true }
            );
            count++
            console.log(count);
        }
    }


    const updateMyDB = async () => {
        let count = 1
        for (const game of games) {
            if (count > 0) {
                await new Promise(resolve => setTimeout(() => {
                    // console.log(game);
                    resolve();
                }, 1000));
                console.log(game.gameId);
                const { minplaytime, maxplaytime, description, boardgamecategory } = await fetchXML(game.gameId)
                // If you want to perform the axios request:

                game.minplaytime = minplaytime
                game.maxplaytime = maxplaytime
                game.description = description
                game.boardgamecategory = boardgamecategory


                console.log(game);


                const plusGame = await axios.post(`${MY_URL}/games/savinggames`,
                    { game },
                    { withCredentials: true }
                );
                console.log('Well Done',count,plusGame);
            
            }

            count++
            console.log('Starting ==>',count);
        }
    }

    const fetchXML = async (gameid = 132620) => {

        try {
            const response = await axios.get(
                `https://api.geekdo.com/xmlapi2/thing?id=${gameid}`
                `https://api.geekdo.com/xmlapi2/thing?id=6606`
            );
            let xmldata = parser.parse(response.data);
            console.log(xmldata);
            const minplaytime = xmldata.items.item.minplaytime['@_value']
            const maxplaytime = xmldata.items.item.maxplaytime['@_value']
            const description = xmldata.items.item.description
            const boardgamecategory = xmldata.items.item.link[0]['@_value']

            console.log(minplaytime);



            setXml(xmldata)

            return { minplaytime, maxplaytime, description, boardgamecategory }

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <h3>game</h3>
            <button onClick={getGame}>get</button>
            {/* <button onClick={createMyDB}>start stealing</button> */}
            <button onClick={updateMyDB}>start update</button>

            {
                games.map((item, i) => {
                    return (
                        <div key={item.gameId}>
                            {/* {console.log(item.gameid)} */}
                            <h2>{item.name}</h2>

                            {/* <p>big img</p>
                            <img src={item.image} alt="" />  */}

                            <p>Small img</p>
                            <img src={item.thumbnail} alt="" />
                        </div>
                    )
                })
            }
        </>
    )
}
export default Game