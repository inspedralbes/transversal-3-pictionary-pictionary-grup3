import { useEffect } from "react";

export const RankingGame = ({ socket }) => {

    useEffect(() => {
        socket.emit('next turn')
        socket.on('finished game', (data) => {
            console.log(data)
        })
        console.log('asd')
    }, [socket])
  
    return (
    <></>
    );
  };
  