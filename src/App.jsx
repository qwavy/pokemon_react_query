import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Card, Table} from "antd";


const App = () => {

    const columns = [
        {
            title:"Url",
            dataIndex:"url",
            key:"url",
            render: (text) => <a href={text} className="text-blue-500">{text}</a>,
        },
        {
            title:"Name",
            dataIndex:"name",
            key:"name"
        },
    ]

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['pokemons'],
        queryFn: async () => {
            const response = await fetch(
                'https://pokeapi.co/api/v2/pokemon?limit=5',
            )
            return await response.json()
        },
    })

    if (isPending) return 'loadingg'

    if (error) return `error ${error.message}`

    return (
        <div className="flex justify-center gap-12">
            <Table className="w-[500px]" dataSource={data.results} columns={columns}/>
        </div>
    );
};

export default App;